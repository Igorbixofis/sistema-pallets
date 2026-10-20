import { useState } from "react";
import "./style.css";

export default function Contador() {
  const [contador, setContador] = useState(0);
  const [passo, setPasso] = useState(1);
  const [ultimoLoteRegistrado, setUltimoLoteRegistrado] = useState(null);

  // Desafio 1: Travas de Segurança
  const incrementar = () => {
    setContador((valorAnterior) => Math.min(valorAnterior + passo, 50));
  };

  const decrementar = () => {
    setContador((valorAnterior) => Math.max(valorAnterior - passo, 0));
  };

  // Desafio 3: Validação do Campo de Entrada
  const handlePassoChange = (e) => {
    const valor = e.target.value;
    
    // Se o campo estiver vazio
    if (valor === "") {
      setPasso(1);
      return;
    }

    let numero = Number(valor);

    // Se não for um número válido ou for menor que 1
    if (isNaN(numero) || numero < 1) {
      setPasso(1);
    } 
    // Se ultrapassar o limite superior
    else if (numero > 10) {
      setPasso(10);
    } 
    // Dentro do limite (1 a 10)
    else {
      setPasso(numero);
    }
  };

  // Desafio 4: Registro do Último Lote Fechado
  const finalizarLote = () => {
    if (contador > 0) {
      setUltimoLoteRegistrado(contador);
    }
    setContador(0);
  };

  // Desafio 2: Indicador Visual de Status
  let statusClasse = "status-normal";
  let statusTexto = "Lote Normal";
  
  if (contador === 50) {
    statusClasse = "status-completo";
    statusTexto = "Lote Fechado";
  } else if (contador >= 40) {
    statusClasse = "status-alerta";
    statusTexto = "Capacidade quase atingida";
  }

  // Desafio 1: Desabilitar botões dinamicamente
  const isDecrementarDisabled = contador === 0 || contador - passo < 0;
  const isIncrementarDisabled = contador === 50 || contador + passo > 50;

  return (
    <div className={`card-exemplo ${statusClasse}-border`}>
      <div className="card-header">
        <span className="badge">Painel de Controle</span>
        <h3>Controle de Lotes (Max: 50)</h3>
      </div>

      {/* Indicador de Status Visual */}
      <div className={`status-indicador ${statusClasse}`}>
        <strong>{statusTexto}</strong>
        <span>{contador} / 50 caixas</span>
      </div>

      <div className="contador-display">
        <span className={`numero-contador ${statusClasse}-text`}>{contador}</span>
      </div>

      <div className="passo-container">
        <label htmlFor="passo-input">Passo do incremento: </label>
        <input
          id="passo-input"
          type="number"
          min="1"
          max="10"
          value={passo}
          onChange={handlePassoChange}
        />
      </div>

      <div className="botoes-grupo">
        <button 
          className="btn btn-decrementar" 
          onClick={decrementar}
          disabled={isDecrementarDisabled}
        >
          - {passo}
        </button>
        <button className="btn btn-resetar" onClick={finalizarLote}>
          Finalizar / Zerar
        </button>
        <button 
          className="btn btn-incrementar" 
          onClick={incrementar}
          disabled={isIncrementarDisabled}
        >
          + {passo}
        </button>
      </div>

      {/* Exibição do Último Lote */}
      {ultimoLoteRegistrado !== null && (
        <div className="ultimo-lote-box">
          <span>📦 Último lote finalizado:</span>
          <strong>{ultimoLoteRegistrado} caixas</strong>
        </div>
      )}

      <div className="explicacao-box">
        <code>const [contador, setContador] = useState(0);</code>
        <p>
          O estado armazena um valor numérico com travas de segurança (0 a 50) e feedback visual dinâmico.
        </p>
      </div>
    </div>
  );
}