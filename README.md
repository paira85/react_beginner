# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```



# #################################

# props
props = react에서 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하는 매커니즘
부모 컴포넌트가 정의한 데이터를 자식 컴포넌트에게 전달하여, 컴포넌트간 데이터 흐름을 효율적으로 관리할 수 있다.

1. 단방향 데이터 흐름 (one -way -flow): 데이터는 항상 부모 -> 자식으로 전달
2. 읽기전용 : props는 자식 컴포넌트에서 수정할 수 없고, 조회와 출력에만 사용

# [shacn.ui](https://ui.shadcn.com/)
# https://ui.shadcn.com/docs/components/skeleton

# separator
npx shadcn@latest add separator

# button
npx shadcn@latest add button

# https://www.iconfinder.com/search?q=user


# reactRouter
https://reactrouter.com/start/declarative/installation

<Outlet /> : 해당페이지 영역만 변환되고 나머지는 변환되지 않는다. <header>(Outlet : Main)<footer>

# react 기본 펑션
rfc

# Label
npx shadcn@latest add label
/ui/index.ts 에 임포트 작성

# input
npx shadcn@latest add input
/ui/index.ts 에 임포트 작성

# form
npx shadcn@latest add form

# checkbox
npx shadcn@latest add checkbox


# 수퍼베이스
Supabase는 Firebase와 비슷한 오픈소스 백엔드 서비스(BaaS, Backend as a Service) 플랫폼이에요.
기본적으로 “PostgreSQL 기반의 Firebase 대체재”라고 보면 됩니다.

https://supabase.com/

database pw : 2J41j75OBdZ76Z9h
database pw : 2J41j75OBdZ76Z9h

설치 
https://supabase.com/docs/reference/javascript/start

이메일 인증 설정 - 임시 차단
https://supabase.com/dashboard/project/ylqjxewsinkbdmfifaqg/auth/providers
Confirm email = 비활성화

패스워드 베이스 설정
https://supabase.com/docs/guides/auth/passwords

# sonner
toast alert
npx shadcn@latest add sonner

# 수퍼베이스 DATABASE 생성
FE 리액트 24강 참조
table 권한 설정
https://supabase.com/dashboard/project/ylqjxewsinkbdmfifaqg/auth/policies?search=17495&schema=public
api docs
https://supabase.com/dashboard/project/ylqjxewsinkbdmfifaqg/editor/17495

# zustand 
전역상태관리
npm install zustand

https://zustand-demo.pmnd.rs/

# persist
로컬스토리지 세션 저장

# BlockNote
edit
npm install @blocknote/core @blocknote/react @blocknote/mantine


# nanoid == uuid
npm install nanoid 

# dialog
npx shadcn@latest add dialog

# badge
npx shadcn@latest add badge


# dayjs
npm install dayjs

# card
npx shadcn@latest add card

# alert-dialog
npx shadcn@latest add alert-dialog