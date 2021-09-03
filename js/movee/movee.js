// movee.js v1.0.0
// September 3rd, 2021
// Author: Santiago Díaz Guevara <santidiazg@hotmail.es>
//
// Movee is defined as an object to be moved. It's the target of a movement.
// This library allows movement of an HTML element in 4 directions through
// buttons and arrow keys.

// `movee` exports the following types in an object to avoid
// populating global scope.
//
// {
//   Movee,         /* class */
//   setupMovement, /* function */
// }
const movee = (() => {

    // Movee binds an HTML element to be moved inside a container and allows it
    // to be controlled.
    //
    // It exposes the following methods:
    // * moveLeft()
    // * moveUp()
    // * moveDown()
    // * moveRight()
    // * setPXPerMovement(px: int)
    class Movee {

        // constructor takes the following parameters:
        // * containerID:   string. The HTML element ID that contains and sets the bounds for the movee element.
        // * moveeID:       string. The HTML element ID which will be moved.
        // * pxPerMovement: int.    The amount of pixels per movement for every direction.
        constructor(containerID, moveeID, pxPerMovement) {
            this.container = document.getElementById(containerID)
            this.containerPadding = getComputedStyle(this.container).padding
            this.pxPerMovement = pxPerMovement

            this.movee = document.getElementById(moveeID)
            this.moveeStyle = getComputedStyle(this.movee)
        }

        // setPXPerMovement updates the amount of pixels per movement.
        // Parameter `px` must be an integer.
        setPXPerMovement(px) {
            this.pxPerMovement = px
        }

        // moveLeft moves this object `pxPerMovement` amount of pixels in the left direction
        // if it does not reach the container's bounds.
        moveLeft() {
            const currLeft = parseInt(this.moveeStyle.left.replace("px", ""))
            if (currLeft - this.pxPerMovement < 0) {
                return
            }

            this.movee.style.left = currLeft - this.pxPerMovement + "px"
        }

        // moveUp moves this object `pxPerMovement` amount of pixels upwards
        // if it does not reach the container's bounds.
        moveUp() {
            const currTop = parseInt(this.moveeStyle.top.replace("px", ""))
            if (currTop - this.pxPerMovement < 0) {
                return
            }

            this.movee.style.top = currTop - this.pxPerMovement + "px"
        }

        // moveDown moves this object `pxPerMovement` amount of pixels downwards
        // if it does not reach the container's bounds.
        moveDown() {
            const currTop = parseInt(this.moveeStyle.top.replace("px", ""))
            const padding = parseInt(this.containerPadding.replace("px", ""))
            if (this.container.offsetHeight - currTop - this.movee.offsetHeight - this.pxPerMovement - padding < 0) {
                return
            }

            this.movee.style.top = currTop + this.pxPerMovement + "px"
        }

        // moveRight moves this object `pxPerMovement` amount of pixels in the right direction
        // if it does not reach the container's bounds.
        moveRight() {
            const currLeft = parseInt(this.moveeStyle.left.replace("px", ""))
            const padding = parseInt(this.containerPadding.replace("px", ""))
            if (this.container.offsetWidth - currLeft - this.movee.offsetWidth - this.pxPerMovement - padding < 0) {
                return
            }

            this.movee.style.left = currLeft + this.pxPerMovement + "px"
        }
    }

    // setupMovement sets event listeners which control movement. It sets listeners for
    // each of the 4 buttons associated to each cardinal direction, for arrow key presses,
    // and for numeric input for pixelPerMovement configuration.
    //
    // Takes the following parameters:
    // * movee:                object. A Movee object to be controlled.
    // * leftID:               string. The HTML button ID which controls moving to the left.
    // * downID:               string. The HTML button ID which controls moving downwards.
    // * upID:                 string. The HTML button ID which controls moving upwards.
    // * rightID:              string. The HTML button ID which controls moving to the right.
    // * pxPerMovementInputID: string. The HTML numeric input ID which sets the pxPerMovement variable.
    function setupMovement(movee, leftID, downID, upID, rightID, pxPerMovementInputID) {
        document.getElementById(leftID).onclick = (e) => {
            movee.moveLeft()
        }
        document.getElementById(downID).onclick = (e) => {
            movee.moveDown()
        }
        document.getElementById(upID).onclick = (e) => {
            movee.moveUp()
        }
        document.getElementById(rightID).onclick = (e) => {
            movee.moveRight()
        }

        document.addEventListener("keydown", e => {
            switch (e.code) {
                case "ArrowLeft":
                    movee.moveLeft()
                    break
                case "ArrowDown":
                    movee.moveDown()
                    break
                case "ArrowUp":
                    movee.moveUp()
                    break
                case "ArrowRight":
                    movee.moveRight()
                    break
            }
        })

        document.getElementById(pxPerMovementInputID).addEventListener("change", (e) => {
            movee.setPXPerMovement(parseInt(e.target.value))
        })
    }

    return {
        Movee,
        setupMovement
    }
})()
