const _defaultPXPerMovement = 20;
const _containerID          = "container";
const _moveeID              = "box";
const _moveLeftButtonID     = "moveLeft";
const _moveDownButtonID     = "moveDown";
const _moveUpButtonID       = "moveUp";
const _moveRightButtonID    = "moveRight";
const _pxInputID            = "pxInputID";

(() => {
    const moveeObj = new movee.Movee(_containerID, _moveeID, _defaultPXPerMovement)
    movee.setupMovement(
        moveeObj,
        _moveLeftButtonID,
        _moveDownButtonID,
        _moveUpButtonID,
        _moveRightButtonID,
        _pxInputID,
    )
})()
