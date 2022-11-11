import { useState } from 'react'
import html2canvas from 'html2canvas'

/**
 * @module Main_Hook
 * Hook return
 * @typedef {Array} HookReturn
 * @property {string} HookReturn[0] - image string
 * @property {string} HookReturn[1] - take screen shot string
 * @property {object} HookReturn[2] - errors
 */
export type Position={
  startX:number,
  startY:number,
  width:number,
  height:number
}
export class ScreenshotTaker {
  
  public static async takeScreenShotById(element_id: string, type?:string, quality?:string) {
    const node=document.getElementById(element_id)
    if (!node) {
      throw new Error('You should provide correct html node.')
    }
    return html2canvas(node)
      .then((canvas) => {
        const croppedCanvas = document.createElement('canvas')
        const croppedCanvasContext = croppedCanvas.getContext('2d')
        // init data
        const cropPositionTop = 0
        const cropPositionLeft = 0
        const cropWidth = canvas.width
        const cropHeight = canvas.height

        croppedCanvas.width = cropWidth
        croppedCanvas.height = cropHeight

        croppedCanvasContext?.drawImage(
          canvas,
          cropPositionLeft,
          cropPositionTop,
        )

        const base64Image = croppedCanvas.toDataURL(type, quality)
        console.log(base64Image)
        return base64Image
      })
      .catch(e => e)
  }
  public static async takeScreenShotByPosition(position:Position,type?:string, quality?:string, documentRoot:string="root", ){
    const node=document.getElementById(documentRoot)
    if (!node) {
      throw new Error('You should provide correct html node.')
    }
    return html2canvas(node)
      .then((canvas) => {
        const croppedCanvas = document.createElement('canvas')
        const croppedCanvasContext = croppedCanvas.getContext('2d')
        // init data
        const cropPositionTop = position.startX
        const cropPositionLeft = position.startY
        const cropWidth = position.width
        const cropHeight = position.height
        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeight;

        croppedCanvas.width = cropWidth
        croppedCanvas.height = cropHeight

        croppedCanvasContext?.drawImage(
          canvas,
          position.startX,
          position.startY,
          position.width,
          position.height,
          0,
          0,
          cropWidth,
          cropHeight,
        )

        const base64Image = croppedCanvas.toDataURL(type, quality)
        return base64Image
      })
      .catch(e => e)
  }
}
/**
 * hook for creating screenshot from html node
 * @returns {HookReturn}
 */
export function useScreenshot(type?: string, quality?: number) {
  const [image, setImage] = useState("")
  const [error, setError] = useState("")
  /**
   * convert html node to image
   * @param {HTMLElement} node
   */
  function takeScreenShot(node: HTMLElement) {
    if (!node) {
      throw new Error('You should provide correct html node.')
    }
    return html2canvas(node)
      .then((canvas) => {
        const croppedCanvas = document.createElement('canvas')
        const croppedCanvasContext = croppedCanvas.getContext('2d')
        // init data
        const cropPositionTop = 0
        const cropPositionLeft = 0
        const cropWidth = canvas.width
        const cropHeight = canvas.height

        croppedCanvas.width = cropWidth
        croppedCanvas.height = cropHeight

        croppedCanvasContext?.drawImage(
          canvas,
          cropPositionLeft,
          cropPositionTop,
        )

        const base64Image = croppedCanvas.toDataURL(type, quality)

        setImage(base64Image)
        return base64Image
      })
      .catch(setError)
  }

  return [
    image,
    takeScreenShot,
    {
      error,
    },
  ]
}