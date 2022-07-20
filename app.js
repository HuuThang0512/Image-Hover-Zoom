const smallWrapper = document.querySelector('.image-wrapper')
const smallImage = document.querySelector('.image')
const smallImageHeight = smallImage.offsetHeight
const smallImageWidth = smallImage.offsetWidth
const smallImageCover = document.querySelector('.image__cover')
const smallImageSrc = smallImage.getAttribute('src')
const zoomBlock = document.querySelector('.zoom-block')
const bigImageWrapper = document.querySelector('.big-image-wrapper')
const bigImage = document.querySelector('.big-image')
const smallWrapperHeight = smallWrapper.offsetHeight
const smallWrapperWidth = smallWrapper.offsetWidth
// ----------------------------------------------------------------
smallImageCover.addEventListener('mouseenter', () => {
    zoomBlock.classList.add('is-show')
    bigImage.setAttribute('src', smallImageSrc)
    bigImageWrapper.classList.add('is-show')
    const bigImageHeight = bigImage.offsetHeight
    const bigImageWidth = bigImage.offsetWidth
    const bigWrapperHeight = bigImageWrapper.offsetHeight
    const bigWrapperWidth = bigImageWrapper.offsetWidth
    const ratioX = bigImageWidth / bigWrapperWidth
    const ratioY = bigImageHeight / bigWrapperHeight
    const zoomBlockHeight = smallWrapperHeight / ratioY
    const halfZoomBlockHeight = zoomBlockHeight/2
    const zoomBlockWidth = smallWrapperWidth / ratioX
    const halfZoomBlockWidth = zoomBlockWidth/2
    zoomBlock.style = `width: ${zoomBlockWidth}px; height: ${zoomBlockHeight}px;` 
    const ratio = bigImageHeight/smallImageHeight
    console.log(bigImageHeight, smallImageHeight);
    smallImageCover.addEventListener('mousemove', handleZoom)
    function handleZoom(e) {
        const x = e.pageX - smallWrapper.offsetLeft;
        const y = e.pageY - smallWrapper.offsetTop;
        if(x <= halfZoomBlockWidth) {
            if(y <= halfZoomBlockHeight) {
                zoomBlock.style.top = '0'
            } else if(y >= smallWrapperHeight - halfZoomBlockHeight) {
                zoomBlock.style.top = `${smallWrapperHeight - zoomBlockHeight}px`
            } else {
            zoomBlock.style.top = `${y - halfZoomBlockHeight}px`
            }
            zoomBlock.style.left = '0'
        } else if(x >= smallWrapperWidth - halfZoomBlockWidth) {
            if(y <= halfZoomBlockHeight) {
                zoomBlock.style.top = '0'
            } else if(y >= smallWrapperHeight - halfZoomBlockHeight) {
                zoomBlock.style.top = `${smallWrapperHeight - zoomBlockHeight}px`
            } else {
                zoomBlock.style.top = `${y - halfZoomBlockHeight}px`
            }
            zoomBlock.style.left = `${smallWrapperWidth - zoomBlockWidth}px`
        } else if(y <= halfZoomBlockHeight) {
            zoomBlock.style.top = '0'
            if(x <= halfZoomBlockWidth) {
                zoomBlock.style.left = '0'
            } else if(x >= smallWrapperWidth - halfZoomBlockWidth) {
                zoomBlock.style.right = '0'
            } else {
            zoomBlock.style.left = `${x - halfZoomBlockWidth}px`
            }
        } else if(y >= smallWrapperHeight - halfZoomBlockHeight) {
            zoomBlock.style.top = `${smallWrapperHeight - zoomBlockHeight}px`
            if(x <= halfZoomBlockWidth) {
                zoomBlock.style.left = '0'
            } else if(x >= smallWrapperWidth - halfZoomBlockWidth) {
                zoomBlock.style.right = '0'
            } else {
                zoomBlock.style.left = `${x - halfZoomBlockWidth}px`
            }
        } else {
            zoomBlock.style.top = `${y - halfZoomBlockHeight}px`
            zoomBlock.style.left = `${x - halfZoomBlockWidth}px`
        }
        bigImage.style = `left: ${-parseInt(zoomBlock.style.left) * ratio}px; top: ${-parseInt(zoomBlock.style.top) * ratio}px;`
    }
})

smallImageCover.addEventListener('mouseleave', () => {
    const bigImageWrapper = document.querySelector('.big-image-wrapper')
    bigImageWrapper.classList.remove('is-show')
    zoomBlock.style = `width: 0; height: 0;`
    zoomBlock.classList.remove('is-show')
})