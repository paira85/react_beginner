// React Router는 리액트 애플리케이션에서 URL 경로에 따라 컴포넌트를 매핑해주는 라우팅 라이브러리(프레임워크)
// 입니다.
// SPA (싱글 페이지 어플리케이션) 환경에서 사용자가 URL을 바꿀 때 페이지 전체를 새로고침 하지 않고도 해당 경로에 맞는 컴포넌트만 렌더링하도록 해준다.

/**
 * 리액트 라우터를 사용하는 이유
 * 클라이언트 측 네비게이션 : 전체 페이지가 아닌 필요한 부분만 렌더링하며 빠른 사용자 경험 제공
 * URL 기반 UI 구성 : URL 경로와 UI 상태를 연동함으로써 웹 표준에 충실한 라우팅 로직을 구현
 * 
 * declarative MOde
 *  <BrowserRouter>
     <div className="App">      
       <h1>Fronted Devleoper</h1>
       {// front jsp 역할 }
       <nav>
         <ul className="menu">
           <li><NavLink to="/">Home</NavLink></li>
           <li><NavLink to="/tasks">Tasks</NavLink></li>
           <li><NavLink to="/qna">Qna</NavLink></li>
         </ul>
       </nav>
       {서버 .do 역할 //}
       <Routes>
         <Route path="/" element={<Home/>}></Route>
         <Route path="/tasks/*" element={<Tasks/>}></Route>
         <Route path="/qna" element={<Qna/>}></Route>
       </Routes>
     </div>
     </BrowserRouter>
 * 
 * Data Mode
 * import {createBrowserRouter, RouterProvider} from "react-router" 
 * let router = createBrowserRouter([
 * {
 *  path:"/",
 *  Component:Root,
 *  loader:loadRootData,
 * }
 * ]);
 *  ReactDOM.createRoot(root).render(
 *   <RouterProvider router={router}
 * )
 * 
 * ex
 * 
 * async function productLoader(){
 *   const res = await fetch("/api/products");
 *   return res.json(); // [{id:1,name:"상품1"},{id:2,name:"상품2"}]
 * }
 * 
 * const router = createBrowserRouter([
 * {
 *  path:"/products",
 *  Component: <ProductList />,
 *  loader:productLoader, // [{id:1,name:"상품1"},{id:2,name:"상품2"}]
 * }
 * ]);
 * 
 * function ProductList(){
 *   const products userLoaderData();   // productLoader, // [{id:1,name:"상품1"},{id:2,name:"상품2"}]
 *   return (
 *      <ul>
 *        {
 *           products.map(p =>(<li key={p.id}>{p.name}</li>))
 *        }
 *      </ul>
 *   )
 * }
 */
