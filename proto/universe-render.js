export function drawUniverse(ctx, view, items, images, time, reduced) {
  const { width:w, height:h, x, y, zoom } = view
  ctx.clearRect(0,0,w,h)
  const bg = ctx.createRadialGradient(w*.5,h*.47,0,w*.5,h*.47,w*.65)
  bg.addColorStop(0,'#262338'); bg.addColorStop(.45,'#121723'); bg.addColorStop(1,'#070c12')
  ctx.fillStyle=bg;ctx.fillRect(0,0,w,h)
  for(let i=0;i<150;i++) {
    const sx=(i*7919%1000)/1000*w,sy=(i*3571%1000)/1000*h
    ctx.globalAlpha=.18+(i%5)/8;ctx.fillStyle=i%7?'#b1c8ca':'#ffbb80';ctx.beginPath();ctx.arc(sx,sy,i%3===0?1.1:.6,0,Math.PI*2);ctx.fill()
  }
  ctx.globalAlpha=1;ctx.save();ctx.translate(w/2+x,h/2+y);ctx.scale(zoom,zoom)
  for(let i=0;i<3;i++) {
    ctx.save();ctx.rotate(-.3+i*.45);ctx.strokeStyle=['#c0956729','#99bdd41a','#e6a6e21a'][i];ctx.lineWidth=1;ctx.setLineDash(i===1?[3,9]:[]);ctx.beginPath();ctx.ellipse(0,0,250+i*80,105+i*60,0,0,Math.PI*2);ctx.stroke();ctx.restore()
  }
  // A reel of film curls through the space; everything follows the same camera transform.
  ctx.save();ctx.rotate(-.23);ctx.strokeStyle='#b3c6b712';ctx.lineWidth=35;ctx.beginPath();ctx.ellipse(0,0,330,135,0,0,Math.PI*2);ctx.stroke();ctx.strokeStyle='#b3c6b73b';ctx.lineWidth=7;ctx.setLineDash([5,12]);ctx.beginPath();ctx.ellipse(0,0,330,150,0,0,Math.PI*2);ctx.stroke();ctx.restore()
  ctx.fillStyle='#a2bec2';ctx.textAlign='center';ctx.font='10px monospace';ctx.fillText('THE STORY NEVER ENDS',0,20)
  const hits=[]
  items.forEach((show,i)=> {
    const mobile=w<650
    const offset=i-(items.length-1)/2
    const px=mobile ? offset*150 : offset*285
    const py=mobile ? [35,-100,90][i] : [20,-75,55][i]
    const drift=reduced?0:Math.sin(time/1800+i*2)*9
    const bw=mobile?115:170,bh=mobile?167:240
    const left=px-bw/2,top=py-bh/2+drift
    ctx.strokeStyle='#b3c6b725';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(px,py);ctx.stroke()
    ctx.save();ctx.translate(px,py+drift);ctx.rotate((i-1)*.09);ctx.shadowColor=show.color+'55';ctx.shadowBlur=28
    ctx.fillStyle='#121c22';ctx.fillRect(-bw/2-8,-bh/2-8,bw+16,bh+16);ctx.shadowBlur=0
    const img=images.get(show.id)
    if(img?.complete && img.naturalWidth) ctx.drawImage(img,-bw/2,-bh/2,bw,bh)
    else { ctx.fillStyle=show.color;ctx.fillRect(-bw/2,-bh/2,bw,bh) }
    ctx.strokeStyle='#c9d6c555';ctx.lineWidth=1;ctx.strokeRect(-bw/2-8,-bh/2-8,bw+16,bh+16)
    ctx.fillStyle='#f5e7cc';ctx.font='9px monospace';ctx.textAlign='left';ctx.fillText('0'+(i+1)+' / '+show.year,-bw/2,-bh/2-19)
    ctx.fillStyle='#bce9df';ctx.font='10px monospace';ctx.textAlign='center';ctx.fillText('★ '+show.rating+'  ·  ОТКРЫТЬ ↗',0,bh/2+27)
    ctx.restore()
    hits.push({id:show.id,left:w/2+x+(left-12)*zoom,top:h/2+y+(top-12)*zoom,width:(bw+24)*zoom,height:(bh+24)*zoom})
  })
  ctx.restore();return hits
}
