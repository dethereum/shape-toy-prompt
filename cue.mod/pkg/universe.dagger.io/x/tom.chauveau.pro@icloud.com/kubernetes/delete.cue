package kubernetes

// Execute `kubectl delete` in a container
// See `_#base` in `./base.cue` for spec details
#Delete: {
	_#base & {
		action: "delete"
	}
}
