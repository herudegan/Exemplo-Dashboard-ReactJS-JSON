// CSS
import "../CSS/css.css"

// Icones
import * as AntDesign from "react-icons/ai"
import * as Io5 from "react-icons/io5"
import * as Tfi from "react-icons/tfi"

// Dados
import * as Data from '../Back/empresas.json'

// Gráficos
import { VerticalBar } from "../Utils/verticalBar"
import { DoughnutGraphic } from "../Utils/doughnutGraphic"
import { DoughnutGraphic2 } from "../Utils/doughnutGraphic2"
import { PieGraphic } from "../Utils/pieGraphic"
import { PieGraphic2 } from "../Utils/pieGraphic2"
import { LineGraphic } from "../Utils/lineGraphic"
import { useState, useEffect } from "react"

export default function App() {

  // Inicializando a variável text e valor_selecionado
  var text = Data.cermaq[0]
  var valor_selecionado = "CERMAQ"

  // Inicializando a const options para utilizar no select
  const options = [
    { value: 'cermaq', text: 'CERMAQ' },
    { value: 'seo', text: 'SEO' }
  ];

  // Inicializando a const selected para depois usar o handleChange e saber qual o valor selecionado no select
  const [selected, setSelected] = useState(options[0].value)

  // Fazendo a alteração do valor selecionado no select
  function handleChange(x) {
    console.log(x.value);
    setSelected(x.value);
  };

  // Fazendo a alteração do valor da variável text dependendo do que estiver selecionado no select
  if(selected == 'seo'){
    text = Data.seo[0]
    valor_selecionado = 'SEO'
  }
  else{
    text = Data.cermaq[0]
    valor_selecionado = 'CERMAQ'
  }

  // Icone para o Select
  const Icon = () => {
    return (
      <svg height="20" width="20" viewBox="0 0 20 20">
        <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
      </svg>
    );
  };

  // Select
  const Dropdown = ({ options }) => {

    // Consts para setar quando está aberto e o que está selecionado
    const [aberto, setAberto] = useState(false)
  
    // useEffect para lidar com o click no select
    useEffect(() => {
        const handle = () => setAberto(false)
  
        window.addEventListener('click', handle)
        return () => {
            window.removeEventListener('click', handle)
        }
    })
  
    // Abre e fecha o select
    function handleClick(x) {
        x.stopPropagation()
        setAberto(!aberto)
    }
  
    // Lida quando algo dentro do select é selecionado
    function onClick(x) {
      setSelected(x.value);
      handleChange(x);
    }
  
    // O select em si
    return (
      <div className="dropdown-container">
        <div onClick={handleClick} className="dropdown-input">
          <div className="dropdown-selected-value">{valor_selecionado}</div>
          <div className="dropdown-tools">
            <div className="dropdown-tool">
              <Icon />
            </div>
          </div>
        </div>
        {aberto && (
        <div className="dropdown-menu">
          {options.map((x) => (
            <div onClick={() => {onClick(x), handleChange(x)}} key={x.value} style={{backgroundColor: valor_selecionado == x.text ? "#0d6efd" : "#cfb1e7", color: valor_selecionado == x.text ? "#fff" : "#000"}} className={"dropdown-item"}>
              {x.text}
            </div>
            ))}
        </div>
        )}
      </div>
    );
  };

  // Cards Linha 1
  const cards = text.cards

  // Cardas Linha 2 Coluna do meio
  const cards2 = text.cards2

  // Card Linha 3, Coluna da Esquerda
  const vendedores = text.melhores_vendedores

  // Cards Linha 4, 5 e 6, Coluna da Direita
  const cards4 = text.cards4

  // Cards Linha 4, 5 e 6, Coluna da Esquerda
  const cards5 = text.cards5


  // Gráfico Vendas por Bandeiras Mês
  const pieGraphic1 = [text.bandeiras.map((x) => {
    return x.vendas
  })]

  // Gráfico Vendas por Forma Pagamento Mês
  const pieGraphic2 = [text.pagamentos.map((x) => {
    return x.vendas
  })]

  // Gráfico Inadimplência
  var total_value = 0
  var max_value = 0
  text.inadimplencia.map((x) => {
    total_value += x.valor
  })
  const doughnutGraphic1 = [text.inadimplencia.map((x) => {
    return x.valor
  })]
  const label = [text.inadimplencia.map((x) => {
    if(((x.valor/total_value)*100).toFixed(0) > max_value){
      max_value = ((x.valor/total_value)*100).toFixed(0)
    }
    return x.tempo + ': R$ ' + x.valor + ' - ' + ((x.valor/total_value)*100).toFixed(0) + '%'
  })]
  const max = max_value
  const text_doughnut = max + "%"

  // Gráfico Entradas X Saidas
  var total_value_entradasxsaidas = 0
  var entrada = 0
  text.entradasxsaidas.map((x) => {
    total_value_entradasxsaidas += x.valor
    if(x.nome == 'Entradas'){
      entrada = x.valor
    }
  })
  const doughnutGraphic2 = [text.entradasxsaidas.map((x) => {
    return x.valor
  })]
  const label2 = [text.entradasxsaidas.map((x) => {
    return x.nome + ': R$ ' + x.valor + ' - ' + ((x.valor/total_value_entradasxsaidas)*100).toFixed(0) + '%'
  })]

  // Gráfico Semana Passada X Semana Atual
  const lineGraphic_antiga = [text.semanas.map((x) => {
    return x.vendas_antigas
  })]
  const lineGraphic_nova = [text.semanas.map((x) => {
    return x.vendas_novas
  })]
  const label_line = [text.semanas.map((x) => {
    return x.dia
  })]

  // Gráfico Média Vendas por Hora (QTDE)
  const verticalBar = [text.vendas.map((x) => {
    return x.media
  })]
  const label_vertical = [text.vendas.map((x) => {
    return x.dia
  })]

  return(
    <>
      {/* Fundo */}
      <div className="container">
        {/* Linha da Esquerda */}
        <div className="sidebar" style={{textAlign: "center"}}>
          <div className="icons">
            <a href="/"><AntDesign.AiFillHome size={40} color="white" style={{marginTop: "35vh", marginBottom: "5vh", cursor: "pointer"}}/></a><br/>
            <a href="/teste"><AntDesign.AiFillIdcard size={40} color="white" style={{cursor: "pointer", marginBottom: "5vh"}}/></a><br/>
            <a href="/teste2"><AntDesign.AiOutlineLogout size={40} color="white" style={{cursor: "pointer"}}/></a>
          </div>
        </div>
        {/* Header */}
        <div className="header"> 
          <Dropdown value={selected} onChange={handleChange} options={options}/>
        </div>
      </div>
      {/* Cards Linha 1 */}
      {cards.map((x) => {
        return(
          <div className="cards" style={{position: "absolute", top: "10vh", left: `${x.pos}`}}>
            {x.label}
            <div style={{display: "flex"}}>
              <p style={{fontSize: "12px", marginTop: "5vh", marginLeft: "6vw", color: x.label == "Contas a Pagar Hoje" ? "red" : "#7534aa"}}>R$</p>
              <p style={{marginTop: "4vh", fontSize: "24px", marginLeft: "0.2vw", color: x.label == "Contas a Pagar Hoje" ? "red" : "#7534aa"}}>{x.val}</p>
            </div>
          </div>
        )
      })}
      {/* Gráfico Linha 2 Coluna Direita */}
      <div className="graphic1" style={{position: "absolute", top: "28vh", left: "5.1vw"}}> 
        <DoughnutGraphic dados={doughnutGraphic1} label={label} max={max} text_percentage={text_doughnut}/>
      </div>
      {/* Cards Linha 2 Coluna Meio */}
      {cards2.map((x) => {
        var icon
        if(x.label == "Ticket Médio 6 Meses"){
          icon = <Io5.IoTicketSharp style={{marginTop: "1vh"}} size={60}/>
        }
        else{
          icon = <Io5.IoBarChartOutline style={{marginTop: "1vh"}} size={60}/>
        }
        return(
          <div className="cards" style={{position: "absolute", width: "24vw", top: `${x.pos}`, left: "39vw"}}>
            {x.label}
            <div style={{display: "flex"}}>
              <p style={{fontSize: "12px", marginTop: "5vh", color: "#7534aa"}}>R$</p>
              <p style={{marginTop: "4vh", fontSize: "24px", marginLeft: "0.2vw", color: "#7534aa"}}>{x.val}</p>
              <div style={{textAlign: "right", width: "100%" , color: "#7534aa"}}>{icon}</div>
            </div>
          </div>
        )
      })}
      {/* Gráfico Linha 2 Coluna Esquerda */}
      <div className="graphic1" style={{position: "absolute", top: "28vh", left: "68vw"}}> 
        <DoughnutGraphic2 dados={doughnutGraphic2} label={label2} entrada={entrada}/>
      </div>
      {/* Card Linha 3 Coluna Esquerda */}
      <div className="cards" style={{position: "absolute", top: "65vh", left: "5.1vw", height: "18vh"}}> 
        Melhor Vendedor
        {vendedores.map((x) => {
          return(
            <>
              <div style={{color: "#7534aa"}}>
                <p style={{fontSize: "12px", position: "absolute", top: x.top+"vh", left: x.left}}>{x.mes}</p>
                <p style={{fontSize: x.size, position: "absolute", top: x.top_nome, left: x.left}}>{x.nome}</p>
                <p style={{fontSize: "20px", position: "absolute", top: x.top_valor, left: x.left}}><font style={{fontSize: "12px"}}>R$</font> {x.valor}</p>
              </div>
              <div style={{width: x.width, height: x.height, backgroundColor: "black", position: "absolute", top: x.top_div, left: x.left_div}}/>
            </>
          )
        })}
      </div>
      {/* Gráfico Linha 3 Coluna Meio-Esquerda */}
      <div className="cards" style={{position: "absolute", top: "65vh", left: "29.1vw", height: "18vh"}}> 
        <PieGraphic2 dados={pieGraphic2}/>
      </div>
      {/* Gráfico Linha 3 Coluna Meio-Direita */}
      <div className="cards" style={{position: "absolute", top: "65vh", left: "53.1vw", height: "18vh"}}> 
        <PieGraphic dados={pieGraphic1}/>
      </div>
      {/* Card Linha 3 Coluna Direita */}
      <div className="cards" style={{position: "absolute", top: "65vh", left: "77.1vw", height: "18vh"}}> 
        <VerticalBar dados={verticalBar} label={label_vertical}/>
      </div>
      {/* Cards Linha 4, 5 e 6 Coluna Esquerda */}
      {cards4.map((x) => {
        return(
          <div className="cards" style={{position: "absolute", top: `${x.pos}`, left: "5.1vw"}}>
            {x.label}
            <div style={{color: "#7534aa"}}>
              <p>
                Hoje:
                <a style={{float: "right"}}>R$ {x.val1}</a>
              </p>
              <p>
                Mês:
                <a style={{float: "right"}}>R$ {x.val2}</a>
              </p>
            </div>
          </div>
        )
      })}
      {/* Gráfico grandão A.K.A Gráfico Linha 4/5/6 Coluna Meio*/}
      <div className="graphic2" style={{position: "absolute", top: "95vh", left: "29.1vw"}}> 
        <LineGraphic antiga={lineGraphic_antiga} nova={lineGraphic_nova} label={label_line}/>
      </div>
      {/* Cards Linha 4, 5 e 6 Coluna Direita */}
      {cards5.map((x) => {
        var icon
        if(x.label == "Contas a Receber em Aberto" || x.label == "Contas a Pagar em Aberto"){
          icon = <Tfi.TfiMoney size={60} style={{color: x.label == "Contas a Receber em Aberto" ? "green" : "red"}}/>
        }
        else{
          icon = <AntDesign.AiFillCreditCard size={60}/>
        }
        return(
          <div className="cards" style={{position: "absolute", top: `${x.pos}`, left: "77.1vw"}}>
            {x.label}
            <div style={{color: "#7534aa", flexDirection: "row", display: "flex"}}>
              <p style={{marginTop: "4vh", fontSize: "12px"}}>R$<a style={{fontSize: "36px"}}>{x.val}</a></p>
              <div style={{textAlign: "right", width: "100%"}}>{icon}</div>
            </div>
          </div>
        )
      })}
    </>
  )
}