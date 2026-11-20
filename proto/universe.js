import { artwork } from './art.js'
import { drawUniverse } from './universe-render.js'

export function mountUniverse(root, shows) {
  const canvas=root.querySelector('canvas'),ctx=canvas.getContext('2d')
  if(!ctx) return () => {}
  const abort=new AbortController(),options={signal:abort.signal}
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches
  const view={width:0,height:0,x:0,y:0,zoom:1}
  const images=new Map()
  let frame=0,hits=[],drag=null,moved=false,dead=false
  const draw=time=>{ if(dead)return; hits=drawUniverse(ctx,view,shows,images,time||0,reduced); if(!reduced)frame=requestAnimationFrame(draw) }
  const repaint=()=>{if(reduced&&!dead)draw(0)}
  const resize=()=>{
    const bounds=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio,2)
    view.width=bounds.width;view.height=bounds.height
    canvas.width=bounds.width*dpr;canvas.height=bounds.height*dpr;ctx.setTransform(dpr,0,0,dpr,0,0)
    repaint()
  }
  shows.forEach(show=>{const img=new Image();img.onload=repaint;img.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(artwork(show).replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" '));images.set(show.id,img)})
  const observer=new ResizeObserver(resize);observer.observe(canvas);resize();if(!reduced)frame=requestAnimationFrame(draw)
  const zoomBy=factor=>{view.zoom=Math.max(.5,Math.min(2,view.zoom*factor));repaint()}
  const select=id=>{
    const show=shows.find(item=>item.id===id);if(!show)return
    const detail=root.querySelector('.space-detail');detail.hidden=false
    detail.innerHTML=`<button class="close-detail" aria-label="Закрыть описание">×</button><small>МИР № ${show.id} · ${show.year}</small><h2>${show.title}</h2><p>${show.short}</p><span>★ ${show.rating} / ${show.genres.join(' · ')}</span>`
    detail.querySelector('button').focus({preventScroll:true})
  }
  root.addEventListener('click',event=>{
    const target=event.target.closest('button');if(!target)return
    if(target.dataset.select)select(Number(target.dataset.select))
    if(target.id==='zoom-in')zoomBy(1.2)
    if(target.id==='zoom-out')zoomBy(1/1.2)
    if(target.id==='zoom-reset'){Object.assign(view,{x:0,y:0,zoom:1});repaint()}
    if(target.classList.contains('close-detail')){root.querySelector('.space-detail').hidden=true;root.querySelector('[data-select]')?.focus({preventScroll:true})}
  },options)
  canvas.addEventListener('pointerdown',event=>{if(event.button!==0)return;drag={x:event.clientX,y:event.clientY};moved=false;canvas.setPointerCapture(event.pointerId);canvas.classList.add('dragging')},options)
  canvas.addEventListener('pointermove',event=>{
    if(!drag)return
    const dx=event.clientX-drag.x,dy=event.clientY-drag.y
    if(Math.abs(dx)+Math.abs(dy)>3)moved=true
    view.x+=dx;view.y+=dy;drag={x:event.clientX,y:event.clientY};repaint()
  },options)
  canvas.addEventListener('pointerup',event=>{
    if(!drag)return;drag=null;canvas.classList.remove('dragging')
    if(!moved){const rect=canvas.getBoundingClientRect(),x=event.clientX-rect.left,y=event.clientY-rect.top;const hit=hits.findLast(h=>x>=h.left&&x<=h.left+h.width&&y>=h.top&&y<=h.top+h.height);if(hit)select(hit.id)}
  },options)
  canvas.addEventListener('pointercancel',()=>{drag=null;canvas.classList.remove('dragging')},options)
  canvas.addEventListener('wheel',event=>{event.preventDefault();zoomBy(Math.exp(-event.deltaY*.001))},{...options,passive:false})
  return ()=>{dead=true;cancelAnimationFrame(frame);observer.disconnect();abort.abort();images.forEach(image=>{image.onload=null})}
}
