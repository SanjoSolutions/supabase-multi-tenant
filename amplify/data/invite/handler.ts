import type { Schema } from '../resource'

export const handler: Schema['invite']['functionHandler'] = async (
  event,
  context
) => {
  console.log('event', event)
}
