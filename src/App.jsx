import Contador from './components/contador'; 
import './App.css';

export default function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Painel de Controle de Lotes Industriais</h1>
        <p>AutomaLog Soluções Logísticas - Controle de Empacotamento</p>
      </header>

      <main className="grid-exemplos">
        <Contador />
      </main>

      <footer className="app-footer">
        <p>Desenvolvido com React - Hook useState</p>  
      </footer>
    </div>
  )
}