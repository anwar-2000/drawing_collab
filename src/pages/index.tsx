
import { usedraw } from '@/hooks/useDraw'
import { useState } from 'react';
import {ChromePicker} from 'react-color'


export default function Home() {
  const [color , setcolor] = useState<string>('#000')
  const {canvasRef , onMousedown , clear} = usedraw(drawLine)

  function drawLine({prevPoint,currentPoint,ctx} : Draw){
      const {x : currX , y : currY} = currentPoint;
      const lineWidth = 5

      let startPoint = prevPoint ?? currentPoint;
      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = color;

      ctx.moveTo(startPoint.x,startPoint.y);
      ctx.lineTo(currX,currY)

      ctx.stroke()

      ctx.fillStyle = color;

      ctx.beginPath()

      ctx.arc(startPoint.x , startPoint.y, 2 , 0 , 2 * Math.PI)

      ctx.fill()

    }

  return (
    <div className='w-screen h-screen bg-white flex justify-center items-center'>
          <div className='flex flex-col items-center justify-center gap-7 mr-5'>
          <ChromePicker color={color} onChange={(e)=>setcolor(e.hex)}/>
          <button type='button' className='py-2 px-7 rounded-md border border-black text-slate-900' onClick={clear}>Clear All</button>
          </div>
          <canvas
          onMouseDown={onMousedown}
          ref={canvasRef}
          height={450}
          width={750}
          className="border border-black rounded-md" />
    </div>
  )
}
