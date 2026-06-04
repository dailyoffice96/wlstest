import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App';

// (step01) 부트스트랩을 쓰신다면 유지합니다.
import 'bootstrap/dist/css/bootstrap.min.css'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)