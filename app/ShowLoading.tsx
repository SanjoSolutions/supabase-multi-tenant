import { Loading } from './Loading.jsx'

interface BaseProps {
  children: React.ReactNode
}

interface ShowLoadingWhileProps extends BaseProps {
  while: boolean
}

interface ShowLoadingUntil extends BaseProps {
  until: boolean
}

export function ShowLoading(props: ShowLoadingWhileProps | ShowLoadingUntil) {
  const hasWhileBeenProvided = typeof (props as any).while === 'boolean'
  const hasUntilBeenProvided = typeof (props as any).until === 'boolean'
  if (hasWhileBeenProvided && hasUntilBeenProvided) {
    throw new Error('Only provide "while" or "until".')
  } else if (!hasWhileBeenProvided && !hasUntilBeenProvided) {
    throw new Error('Provide "while" or "until".')
  }
  if (hasWhileBeenProvided) {
    return ShowLoadingWhile(props as any)
  } else if (hasUntilBeenProvided) {
    return ShowLoadingUntil(props as any)
  }
}

function ShowLoadingWhile(props: ShowLoadingWhileProps) {
  const { children } = props
  return props.while ? <Loading /> : children
}

function ShowLoadingUntil({ children, until }: ShowLoadingUntil) {
  return until ? children : <Loading />
}
