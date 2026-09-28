import { DARK, FurnaceScene, LIGHT, SCENE_H, SCENE_W } from '../docs/.vitepress/theme/furnace-scene'
import { FURNACE_STAGES } from '../docs/.vitepress/theme/furnace-stages'

/** Renders a stage at a given moment, with everything before it simulated in 16 ms steps. */
function shot(stageIndex: number, at: number, label: string, dark = false) {
  const figure = document.createElement('figure')
  const caption = document.createElement('figcaption')
  caption.textContent = `${label} — stage ${stageIndex + 1} @ ${at} ms`
  const canvas = document.createElement('canvas')
  canvas.width = SCENE_W
  canvas.height = SCENE_H
  figure.append(caption, canvas)
  document.body.append(figure)

  const ctx = canvas.getContext('2d')!
  if (dark) {
    ctx.fillStyle = '#1b1b1f'
    ctx.fillRect(0, 0, SCENE_W, SCENE_H)
  }
  const scene = new FurnaceScene()
  scene.enter(stageIndex)
  const step = 16
  for (let t = 0; t < at; t += step) {
    scene.update(step)
    if (t % 160 === 0) scene.draw(ctx, dark ? DARK : LIGHT)
  }
  scene.draw(ctx, dark ? DARK : LIGHT)
}

const query = new URLSearchParams(location.search)
const mode = query.get('mode') ?? 'settled'

if (mode === 'settled') {
  for (let i = 0; i < FURNACE_STAGES.length; i += 1) shot(i, 4000, 'settled')
} else {
  shot(0, 150, 'early')
  shot(0, 500, 'mid')
  shot(0, 900, 'hand-off')
  shot(1, 500, 'mid')
  shot(1, 1000, 'hand-off')
  shot(2, 500, 'mid')
  shot(2, 900, 'hand-off')
  shot(3, 900, 'hand-off')
}
