declare module "*.mp3" {
  const content: string;
  export default content;
}

declare module "react/jsx-runtime" {
  export default any;
}
