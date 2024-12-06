"use client"

import { useState } from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, MoreHorizontal, Users, Copy, Trash2, Edit, Eye, MoveRight, ChevronLeft, ChevronRight } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditFileDialog } from "./edit-file-dialog"
import { ManageAccessDialog } from "./manage-access-dialog"
import { ViewFileDialog } from "./view-file-dialog"
import { MoveFilesDialog } from "./move-files-dialog"
import { BulkAgentAccessDialog } from "./bulk-agent-access-dialog"
import { useToast } from "@/components/ui/use-toast"
import { getKnowledgeBaseFiles } from "../data"
import type { KnowledgeFile } from "../data"

interface FileManagementTableProps {
  knowledgeBaseId: string
  files: KnowledgeFile[]
  setFiles: (files: KnowledgeFile[]) => void
}

const ITEMS_PER_PAGE = 10

export function FileManagementTable({ 
  knowledgeBaseId,
  files,
  setFiles
}: FileManagementTableProps) {
  const { toast } = useToast()
  const initialFiles = getKnowledgeBaseFiles(knowledgeBaseId)
  const allFiles = [...initialFiles, ...files]
  
  const [selectedFile, setSelectedFile] = useState<KnowledgeFile | null>(null)
  const [selectedFileIds, setSelectedFileIds] = useState<string[]>([])
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [manageAccessOpen, setManageAccessOpen] = useState(false)
  const [viewFileOpen, setViewFileOpen] = useState(false)
  const [moveFilesOpen, setMoveFilesOpen] = useState(false)
  const [bulkAgentAccessOpen, setBulkAgentAccessOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(allFiles.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentFiles = allFiles.slice(startIndex, endIndex)

  const handleSelectFile = (fileId: string, checked: boolean) => {
    setSelectedFileIds(prev => 
      checked ? [...prev, fileId] : prev.filter(id => id !== fileId)
    )
  }

  const handleSelectAll = (checked: boolean) => {
    setSelectedFileIds(checked ? currentFiles.map(file => file.id) : [])
  }

  const handleViewFile = (file: KnowledgeFile) => {
    setSelectedFile(file)
    setViewFileOpen(true)
  }

  const handleEditFile = (file: KnowledgeFile) => {
    setSelectedFile(file)
    setEditDialogOpen(true)
  }

  const handleManageAccess = (file: KnowledgeFile) => {
    setSelectedFile(file)
    setManageAccessOpen(true)
  }

  const handleCloneFile = (file: KnowledgeFile) => {
    const newFile: KnowledgeFile = {
      ...file,
      id: `file-${Date.now()}`,
      name: `${file.name} (Copy)`
    }
    setFiles([...files, newFile])
    toast({
      title: "Success",
      description: "File has been cloned successfully",
      duration: 3000
    })
  }

  const handleDeleteFile = (fileId: string) => {
    setFiles(files.filter(file => file.id !== fileId))
    toast({
      title: "Success",
      description: "File has been deleted successfully",
      duration: 3000
    })
  }

  const handleSaveFile = (updatedFile: Partial<KnowledgeFile>) => {
    if (!selectedFile) return
    
    setFiles(files.map(file => 
      file.id === selectedFile.id ? { ...file, ...updatedFile } : file
    ))
    toast({
      title: "Success",
      description: "File has been updated successfully",
      duration: 3000
    })
  }

  const handleUpdateAccess = (agentIds: string[]) => {
    if (!selectedFile) return
    
    setFiles(files.map(file => 
      file.id === selectedFile.id ? { ...file, connectedAgents: agentIds } : file
    ))
    toast({
      title: "Success",
      description: "File access has been updated successfully",
      duration: 3000
    })
  }

  const handleBulkClone = () => {
    const newFiles = selectedFileIds.map(id => {
      const originalFile = allFiles.find(file => file.id === id)
      if (!originalFile) return null
      return {
        ...originalFile,
        id: `file-${Date.now()}-${id}`,
        name: `${originalFile.name} (Copy)`
      }
    }).filter((file): file is KnowledgeFile => file !== null)

    setFiles([...files, ...newFiles])
    setSelectedFileIds([])
    toast({
      title: "Success",
      description: `${newFiles.length} files have been cloned successfully`,
      duration: 3000
    })
  }

  const handleBulkDelete = () => {
    setFiles(files.filter(file => !selectedFileIds.includes(file.id)))
    setSelectedFileIds([])
    toast({
      title: "Success",
      description: `${selectedFileIds.length} files have been deleted successfully`,
      duration: 3000
    })
  }

  const handleBulkMove = (newKnowledgeBaseId: string) => {
    setFiles(files.map(file => 
      selectedFileIds.includes(file.id) 
        ? { ...file, knowledgeBaseId: newKnowledgeBaseId }
        : file
    ))
    setSelectedFileIds([])
    setMoveFilesOpen(false)
    toast({
      title: "Success",
      description: `${selectedFileIds.length} files have been moved successfully`,
      duration: 3000
    })
  }

  const handleBulkAgentAccess = (agentIds: string[]) => {
    setFiles(files.map(file => 
      selectedFileIds.includes(file.id)
        ? { ...file, connectedAgents: agentIds }
        : file
    ))
    setSelectedFileIds([])
    setBulkAgentAccessOpen(false)
    toast({
      title: "Success",
      description: `Agent access updated for ${selectedFileIds.length} files`,
      duration: 3000
    })
  }

  return (
    <>
      <div className="p-4 border-b flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {allFiles.length} total files
        </div>
        {selectedFileIds.length > 0 ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {selectedFileIds.length} files selected
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkClone}
              >
                <Copy className="h-4 w-4 mr-2" />
                Clone Selected
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setBulkAgentAccessOpen(true)}
              >
                <Users className="h-4 w-4 mr-2" />
                Assign Agents
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMoveFilesOpen(true)}
              >
                <MoveRight className="h-4 w-4 mr-2" />
                Move Selected
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground">
            {startIndex + 1}-{Math.min(endIndex, allFiles.length)} of {allFiles.length} showing
          </div>
        )}
      </div>

      <ScrollArea className="h-[calc(100vh-24rem)]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={selectedFileIds.length === currentFiles.length}
                  onCheckedChange={(checked) => 
                    handleSelectAll(checked as boolean)
                  }
                />
              </TableHead>
              <TableHead>File Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Connected Agents</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentFiles.map((file) => (
              <TableRow key={file.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedFileIds.includes(file.id)}
                    onCheckedChange={(checked) => 
                      handleSelectFile(file.id, checked as boolean)
                    }
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-primary" />
                    {file.name}
                  </div>
                </TableCell>
                <TableCell>{file.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground">
                      {file.connectedAgents.join(", ")}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleViewFile(file)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View File
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditFile(file)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit File
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleManageAccess(file)}>
                        <Users className="mr-2 h-4 w-4" />
                        Manage Access
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleCloneFile(file)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Clone File
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDeleteFile(file.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete File
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>

      <div className="p-4 border-t flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page {currentPage}, {currentFiles.length} files
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {selectedFile && (
        <>
          <EditFileDialog
            file={selectedFile}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            onSave={handleSaveFile}
          />
          <ManageAccessDialog
            file={selectedFile}
            open={manageAccessOpen}
            onOpenChange={setManageAccessOpen}
            onUpdateAccess={handleUpdateAccess}
          />
          <ViewFileDialog
            file={selectedFile}
            open={viewFileOpen}
            onOpenChange={setViewFileOpen}
          />
        </>
      )}

      <MoveFilesDialog
        open={moveFilesOpen}
        onOpenChange={setMoveFilesOpen}
        onMove={handleBulkMove}
        currentKnowledgeBaseId={knowledgeBaseId}
      />

      <BulkAgentAccessDialog
        open={bulkAgentAccessOpen}
        onOpenChange={setBulkAgentAccessOpen}
        onUpdateAccess={handleBulkAgentAccess}
      />
    </>
  )
}