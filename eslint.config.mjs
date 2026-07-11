import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  // preview/ and out/ are generated/hand-authored static builds, not part of
  // the Next.js/TypeScript source tree.
  { ignores: [".next/**", "node_modules/**", "out/**", "preview/**", "scripts/**"] },
];

export default eslintConfig;
