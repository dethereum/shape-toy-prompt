package main

import (
    "dagger.io/dagger"
)

dagger.#Plan & {
    actions: {
        hello: #Run & {
            script: contents: "echo \"Hello!\""
        }
    }
}