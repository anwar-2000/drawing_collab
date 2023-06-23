import { useEffect, useRef, useState } from "react"

export const usedraw = (onDraw : ({ctx,currentPoint,prevPoint} : Draw)=> void) => {
    const [mouseDown,setMouseDown] = useState(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const prevPoint = useRef<null | Point>(null)

    const onMousedown = () => setMouseDown(true)

    const clear = () =>{
        const canvas = canvasRef.current;
        if(!canvas) return;
        const ctx = canvas.getContext('2d');
        if(!ctx) return;
        ctx?.clearRect(0,0,canvas.width,canvas.height)

    }

    useEffect(()=>{


            //adding event listeners 

            const mouseUpHandler = () => {
                    setMouseDown(false)
                    prevPoint.current = null;
            }


             const handler = (e:MouseEvent) => {
            if(!mouseDown){
                return ;
            }
             const currentPoint = computePoints(e)

             const ctx = canvasRef.current?.getContext('2d')
             if(!ctx || !currentPoint) {
                return;
             }

             onDraw({ctx,currentPoint, prevPoint : prevPoint.current})

             prevPoint.current = currentPoint;


        }

        const computePoints = (e:MouseEvent) => {
            const canvas  = canvasRef.current;
            if(!canvas){
                return;
            }
            const rect = canvas.getBoundingClientRect()
            const x  = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            return {x,y}
        }
            canvasRef.current?.addEventListener('mousemove',handler)
            window.addEventListener('mouseup',mouseUpHandler)

            //cleaning up listners

            return () =>  {window.removeEventListener('mouseup',mouseUpHandler)
                canvasRef.current?.removeEventListener('mousemove',handler)}
    },[onDraw])

    return {canvasRef , onMousedown , clear}
}