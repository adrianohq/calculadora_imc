import { useState } from 'react'
import './App.css'

function App() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setImc] = useState(null);
  const [aviso, setAviso] = useState('')

  const calcularIMC = () => {
    if (altura && peso) {
      const alturaMetros = altura / 100;
      const calculoIMC = peso / (alturaMetros * alturaMetros);

      setImc(calculoIMC.toFixed(2));
      setAviso('')
    } else {
      setAviso('Por favor, preencha todos os campos.')
    }

  };

  const classificarIMC = () => {
    const imcClassificacoes = [
      { limite: 18.5, classificacao: 'Abaixo do peso' },
      { limite: 24.9, classificacao: 'Peso normal' },
      { limite: 29.9, classificacao: 'Sobrepeso' },
      { limite: 34.9, classificacao: 'Obesidade Grau I' },
      { limite: 39.9, classificacao: 'Obesidade Grau II' },
      { limite: Infinity, classificacao: 'Obesidade Grau III' }
    ];

    const imcCalculado = parseFloat(imc);

    for (const { limite, classificacao } of imcClassificacoes) {
      if (imcCalculado < limite) {
        return classificacao;
      }
    }
  };

  const getClassIndex = () => {
    const classificacao = classificarIMC();
    switch (classificacao) {
      case 'Abaixo do peso':
        return 0;
      case 'Peso normal':
        return 1;
      case 'Sobrepeso':
        return 2;
      case 'Obesidade Grau I':
        return 3;
      case 'Obesidade Grau II':
        return 4;
      case 'Obesidade Grau III':
        return 5;
      default:
        return 0;
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Calculadora de IMC</h1>
      </header>
      <div className='formInput'>
        <label>Altura (cm):</label>
        <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder='Digite sua altura aqui' />
      </div>
      <div className='formInput'>
        <label>Peso (kg):</label>
        <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder='Digite seu peso aqui' />
      </div>
      <button className='calculaBtn' onClick={calcularIMC}>Calcular IMC</button>
      <div className='aviso'>
        {aviso}
      </div>
      {imc && (
        <div className="result-container">
          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="6"
              value={getClassIndex() + 1}
              className="slider"
              readOnly
            />
          </div>
          <h2>Seu IMC é: {imc}</h2>
          <h3>Você está classificado como: {classificarIMC()}</h3>
        </div>
      )}
    </div>
  );
}

export default App;