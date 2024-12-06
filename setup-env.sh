#!/bin/zsh
export PATH="/opt/homebrew/bin:$PATH"
export PATH="/opt/homebrew/opt/node/bin:$PATH"
export PATH="/usr/bin:$PATH"

# Execute the command passed as arguments
exec "$@"
