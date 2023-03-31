declare module '*.svg' {
  const content:
    | React.FunctionComponent<React.SVGAttributes<SVGElement>>
    | string
  export default content
}
declare module '*.module.css'
declare module '*.module.scss'
