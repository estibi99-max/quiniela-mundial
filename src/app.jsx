import { useState, useEffect } from "react"; 

const SUPABASE_URL = "https://vpbrkjimcdymsbplagfg.supabase.co";
const SUPABASE_KEY = "sb_publishable_YAkbWwXILcXLfPnjV61_pg_Kb9mXQng";
const CUOTA = 250;
const ADMIN_PASS = "Esteban123";

const db = async (path, opts = {}) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": opts.prefer || "",
    },
    ...opts,
  });
  if (res.status === 204 || res.status === 201) return null;
  return res.json();
};

const FLAG_CODE = {
  "México":"mx","Sudáfrica":"za","Corea del Sur":"kr","Chequia":"cz",
  "Canadá":"ca","Qatar":"qa","Suiza":"ch","Bosnia":"ba",
  "Brasil":"br","Marruecos":"ma","Haití":"ht","Escocia":"gb",
  "EE.UU.":"us","Paraguay":"py","Australia":"au","Turquía":"tr",
  "Alemania":"de","Curazao":"cw","Costa de Marfil":"ci","Ecuador":"ec",
  "Países Bajos":"nl","Japón":"jp","Túnez":"tn","Suecia":"se",
  "Bélgica":"be","Egipto":"eg","Irán":"ir","Nueva Zelanda":"nz",
  "España":"es","Cabo Verde":"cv","Arabia Saudita":"sa","Uruguay":"uy",
  "Francia":"fr","Senegal":"sn","Noruega":"no","Iraq":"iq",
  "Argentina":"ar","Argelia":"dz","Austria":"at","Jordania":"jo",
  "Portugal":"pt","Colombia":"co","Uzbekistán":"uz","DR Congo":"cd",
  "Inglaterra":"gb","Croacia":"hr","Ghana":"gh","Panamá":"pa",
};

const codeToEmoji = (code) =>
  code.toUpperCase().split("").map(c =>
    String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65)
  ).join("");

const fl = (t) => {
  const code = FLAG_CODE[t];
  if (!code) return null;
  return (
    <span style={{fontSize:18,lineHeight:1,display:"inline-block",flexShrink:0,verticalAlign:"middle"}}>
      {codeToEmoji(code)}
    </span>
  );
};

const PARTIDOS = [
  {id:1,fase:"A",local:"México",visitante:"Sudáfrica",fecha:"11 Jun"},{id:2,fase:"A",local:"Corea del Sur",visitante:"Chequia",fecha:"11 Jun"},
  {id:3,fase:"A",local:"México",visitante:"Corea del Sur",fecha:"18 Jun"},{id:4,fase:"A",local:"Chequia",visitante:"Sudáfrica",fecha:"18 Jun"},
  {id:5,fase:"A",local:"México",visitante:"Chequia",fecha:"24 Jun"},{id:6,fase:"A",local:"Sudáfrica",visitante:"Corea del Sur",fecha:"24 Jun"},
  {id:7,fase:"B",local:"Canadá",visitante:"Bosnia",fecha:"12 Jun"},{id:8,fase:"B",local:"Qatar",visitante:"Suiza",fecha:"13 Jun"},
  {id:9,fase:"B",local:"Canadá",visitante:"Qatar",fecha:"18 Jun"},{id:10,fase:"B",local:"Suiza",visitante:"Bosnia",fecha:"18 Jun"},
  {id:11,fase:"B",local:"Suiza",visitante:"Canadá",fecha:"24 Jun"},{id:12,fase:"B",local:"Bosnia",visitante:"Qatar",fecha:"24 Jun"},
  {id:13,fase:"C",local:"Brasil",visitante:"Marruecos",fecha:"13 Jun"},{id:14,fase:"C",local:"Haití",visitante:"Escocia",fecha:"14 Jun"},
  {id:15,fase:"C",local:"Marruecos",visitante:"Escocia",fecha:"19 Jun"},{id:16,fase:"C",local:"Brasil",visitante:"Haití",fecha:"19 Jun"},
  {id:17,fase:"C",local:"Escocia",visitante:"Brasil",fecha:"24 Jun"},{id:18,fase:"C",local:"Haití",visitante:"Marruecos",fecha:"24 Jun"},
  {id:19,fase:"D",local:"EE.UU.",visitante:"Paraguay",fecha:"12 Jun"},{id:20,fase:"D",local:"Australia",visitante:"Turquía",fecha:"12 Jun"},
  {id:21,fase:"D",local:"EE.UU.",visitante:"Australia",fecha:"19 Jun"},{id:22,fase:"D",local:"Paraguay",visitante:"Turquía",fecha:"19 Jun"},
  {id:23,fase:"D",local:"EE.UU.",visitante:"Turquía",fecha:"25 Jun"},{id:24,fase:"D",local:"Australia",visitante:"Paraguay",fecha:"25 Jun"},
  {id:25,fase:"E",local:"Alemania",visitante:"Curazao",fecha:"14 Jun"},{id:26,fase:"E",local:"Ecuador",visitante:"Costa de Marfil",fecha:"14 Jun"},
  {id:27,fase:"E",local:"Alemania",visitante:"Ecuador",fecha:"20 Jun"},{id:28,fase:"E",local:"Costa de Marfil",visitante:"Curazao",fecha:"20 Jun"},
  {id:29,fase:"E",local:"Alemania",visitante:"Costa de Marfil",fecha:"25 Jun"},{id:30,fase:"E",local:"Curazao",visitante:"Ecuador",fecha:"25 Jun"},
  {id:31,fase:"F",local:"Países Bajos",visitante:"Japón",fecha:"14 Jun"},{id:32,fase:"F",local:"Túnez",visitante:"Suecia",fecha:"15 Jun"},
  {id:33,fase:"F",local:"Países Bajos",visitante:"Túnez",fecha:"21 Jun"},{id:34,fase:"F",local:"Japón",visitante:"Suecia",fecha:"21 Jun"},
  {id:35,fase:"F",local:"Japón",visitante:"Túnez",fecha:"25 Jun"},{id:36,fase:"F",local:"Suecia",visitante:"Países Bajos",fecha:"25 Jun"},
  {id:37,fase:"G",local:"Bélgica",visitante:"Irán",fecha:"21 Jun"},{id:38,fase:"G",local:"Egipto",visitante:"Nueva Zelanda",fecha:"15 Jun"},
  {id:39,fase:"G",local:"Bélgica",visitante:"Egipto",fecha:"22 Jun"},{id:40,fase:"G",local:"Irán",visitante:"Nueva Zelanda",fecha:"22 Jun"},
  {id:41,fase:"G",local:"Bélgica",visitante:"Nueva Zelanda",fecha:"26 Jun"},{id:42,fase:"G",local:"Irán",visitante:"Egipto",fecha:"26 Jun"},
  {id:43,fase:"H",local:"España",visitante:"Arabia Saudita",fecha:"21 Jun"},{id:44,fase:"H",local:"Uruguay",visitante:"Cabo Verde",fecha:"21 Jun"},
  {id:45,fase:"H",local:"España",visitante:"Uruguay",fecha:"22 Jun"},{id:46,fase:"H",local:"Arabia Saudita",visitante:"Cabo Verde",fecha:"22 Jun"},
  {id:47,fase:"H",local:"España",visitante:"Cabo Verde",fecha:"26 Jun"},{id:48,fase:"H",local:"Uruguay",visitante:"Arabia Saudita",fecha:"26 Jun"},
  {id:49,fase:"I",local:"Francia",visitante:"Senegal",fecha:"16 Jun"},{id:50,fase:"I",local:"Noruega",visitante:"Iraq",fecha:"16 Jun"},
  {id:51,fase:"I",local:"Francia",visitante:"Noruega",fecha:"22 Jun"},{id:52,fase:"I",local:"Senegal",visitante:"Iraq",fecha:"22 Jun"},
  {id:53,fase:"I",local:"Francia",visitante:"Iraq",fecha:"26 Jun"},{id:54,fase:"I",local:"Noruega",visitante:"Senegal",fecha:"26 Jun"},
  {id:55,fase:"J",local:"Argentina",visitante:"Austria",fecha:"16 Jun"},{id:56,fase:"J",local:"Argelia",visitante:"Jordania",fecha:"16 Jun"},
  {id:57,fase:"J",local:"Argentina",visitante:"Argelia",fecha:"22 Jun"},{id:58,fase:"J",local:"Austria",visitante:"Jordania",fecha:"22 Jun"},
  {id:59,fase:"J",local:"Argentina",visitante:"Jordania",fecha:"26 Jun"},{id:60,fase:"J",local:"Austria",visitante:"Argelia",fecha:"26 Jun"},
  {id:61,fase:"K",local:"Portugal",visitante:"Colombia",fecha:"17 Jun"},{id:62,fase:"K",local:"Uzbekistán",visitante:"DR Congo",fecha:"17 Jun"},
  {id:63,fase:"K",local:"Portugal",visitante:"Uzbekistán",fecha:"23 Jun"},{id:64,fase:"K",local:"Colombia",visitante:"DR Congo",fecha:"23 Jun"},
  {id:65,fase:"K",local:"Portugal",visitante:"DR Congo",fecha:"27 Jun"},{id:66,fase:"K",local:"Colombia",visitante:"Uzbekistán",fecha:"27 Jun"},
  {id:67,fase:"L",local:"Inglaterra",visitante:"Croacia",fecha:"17 Jun"},{id:68,fase:"L",local:"Panamá",visitante:"Ghana",fecha:"17 Jun"},
  {id:69,fase:"L",local:"Inglaterra",visitante:"Ghana",fecha:"23 Jun"},{id:70,fase:"L",local:"Croacia",visitante:"Panamá",fecha:"23 Jun"},
  {id:71,fase:"L",local:"Panamá",visitante:"Inglaterra",fecha:"27 Jun"},{id:72,fase:"L",local:"Ghana",visitante:"Croacia",fecha:"27 Jun"},
];

const FASES = ["A","B","C","D","E","F","G","H","I","J","K","L"];
const GRUPOS_INFO = {
  A:["México","Sudáfrica","Corea del Sur","Chequia"],B:["Canadá","Qatar","Suiza","Bosnia"],
  C:["Brasil","Marruecos","Haití","Escocia"],D:["EE.UU.","Paraguay","Australia","Turquía"],
  E:["Alemania","Curazao","Costa de Marfil","Ecuador"],F:["Países Bajos","Japón","Túnez","Suecia"],
  G:["Bélgica","Egipto","Irán","Nueva Zelanda"],H:["España","Cabo Verde","Arabia Saudita","Uruguay"],
  I:["Francia","Senegal","Noruega","Iraq"],J:["Argentina","Argelia","Austria","Jordania"],
  K:["Portugal","Colombia","Uzbekistán","DR Congo"],L:["Inglaterra","Croacia","Ghana","Panamá"],
};

function GrassPattern() {
  return (
    <svg width="100%" height="100%" style={{position:"absolute",top:0,left:0,opacity:0.06,pointerEvents:"none"}} preserveAspectRatio="none">
      {Array.from({length:12},(_,i)=>(
        <rect key={i} x={0} y={i*60} width="100%" height={30} fill={i%2===0?"#fff":"transparent"}/>
      ))}
    </svg>
  );
}

export default function App() {
  const [vista, setVista] = useState("inicio");
  const [participantes, setParticipantes] = useState([]);
  const [nombre, setNombre] = useState("");
  const [preds, setPreds] = useState({});
  const [pActivo, setPActivo] = useState(null);
  const [resultados, setResultados] = useState({});
  const [adminInput, setAdminInput] = useState("");
  const [adminOk, setAdminOk] = useState(false);
  const [adminErr, setAdminErr] = useState(false);
  const [resTemp, setResTemp] = useState({});
  const [msg, setMsg] = useState("");
  const [grupoActivo, setGrupoActivo] = useState("A");
  const [bounce, setBounce] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [adminTab, setAdminTab] = useState("resultados");

  const totalPozo = participantes.length * CUOTA;
  const premio = totalPozo;

  useEffect(() => {
    async function cargar() {
      setLoading(true);
      const [parts, res] = await Promise.all([
        db("participantes?select=nombre,predicciones&order=created_at.asc"),
        db("resultados?id=eq.1&select=datos"),
      ]);
      if (parts) setParticipantes(parts);
      if (res && res[0]) setResultados(res[0].datos || {});
      setLoading(false);
    }
    cargar();
    const interval = setInterval(cargar, 30000);
    return () => clearInterval(interval);
  }, []);

  const calcAciertos = p => Object.entries(resultados).filter(([id,r]) => p.predicciones[id]===r).length;
  const getTabla = () => [...participantes].map(p=>({...p,aciertos:calcAciertos(p)})).sort((a,b)=>b.aciertos-a.aciertos);

  function registrar() {
    if (!nombre.trim()) { setMsg("Escribe tu nombre."); return; }
    if (participantes.find(p=>p.nombre.toLowerCase()===nombre.trim().toLowerCase())) { setMsg("Ese nombre ya está registrado."); return; }
    setPActivo({nombre:nombre.trim()}); setPreds({}); setGrupoActivo("A");
    setVista("predicciones"); setMsg("");
  }

  function pick(id, val) {
    setPreds(p=>({...p,[id]:val}));
    setBounce(id);
    setTimeout(()=>setBounce(null), 400);
  }

  async function guardar() {
    const faltantes = PARTIDOS.length - Object.keys(preds).length;
    if (faltantes > 0) { setMsg(`Faltan ${faltantes} partido(s) por predecir.`); return; }
    setSaving(true);
    try {
      await db("participantes", {
        method: "POST",
        prefer: "return=minimal",
        body: JSON.stringify({ nombre: pActivo.nombre, predicciones: preds }),
      });
      setParticipantes(prev=>[...prev,{nombre:pActivo.nombre,predicciones:{...preds}}]);
      setNombre(""); setPreds({}); setPActivo(null); setVista("exito"); setMsg("");
    } catch(e) {
      setMsg("Error al guardar. Intenta de nuevo.");
    }
    setSaving(false);
  }

  function entrarAdmin() {
    if (adminInput===ADMIN_PASS) { setAdminOk(true); setAdminErr(false); }
    else setAdminErr(true);
  }

  async function borrarParticipante(nombreP) {
    if (!window.confirm(`¿Borrar la quiniela de ${nombreP}?`)) return;
    setSaving(true);
    await db(`participantes?nombre=eq.${encodeURIComponent(nombreP)}`, { method:"DELETE", prefer:"return=minimal" });
    setParticipantes(prev=>prev.filter(p=>p.nombre!==nombreP));
    setMsg(`✓ Quiniela de ${nombreP} borrada`);
    setSaving(false);
  }


    setSaving(true);
    const nuevosDatos = {...resultados,...resTemp};
    await db("resultados?id=eq.1", {
      method: "PATCH",
      prefer: "return=minimal",
      body: JSON.stringify({ datos: nuevosDatos }),
    });
    setResultados(nuevosDatos);
    setResTemp({}); setMsg("✓ Resultados guardados");
    setSaving(false);
  }

  const tabla = getTabla();
  const maxAciertos = tabla.length>0 ? tabla[0].aciertos : 0;
  const ganadores = tabla.filter(p=>p.aciertos===maxAciertos&&maxAciertos>0);
  const premioPorGanador = ganadores.length>0 ? Math.round(premio/ganadores.length) : premio;
  const pct = Math.round((Object.keys(preds).length/PARTIDOS.length)*100);

  const confettiPieces = Array.from({length:18},(_,i)=>({
    left:`${(i*57)%100}%`,
    color:["#C8102E","#1D9E75","#378ADD","#F5A623","#fff"][i%5],
    delay:`${(i*0.12).toFixed(2)}s`,
    size:i%3===0?10:i%3===1?7:5,
  }));

  if (loading) return (
    <div style={{background:"#060d1a",minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:16,fontFamily:"Inter,sans-serif"}}>
      <div style={{fontSize:48,animation:"float 1.5s ease-in-out infinite"}}>⚽</div>
      <p style={{color:"rgba(255,255,255,.5)",fontSize:14}}>Cargando quiniela...</p>
      <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}`}</style>
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:#060d1a;margin:0;}
        .app{font-family:'Inter',sans-serif;background:#060d1a;min-height:100vh;color:#fff;max-width:680px;margin:0 auto;}
        .stadium{width:100%;height:220px;position:relative;background:linear-gradient(180deg,#0a1f0a 0%,#0d2b0d 40%,#0a1f0a 100%);overflow:hidden;}
        .arch{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:340px;height:170px;border:3px solid rgba(255,255,255,0.25);border-bottom:none;border-radius:170px 170px 0 0;}
        .center-spot{position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:8px;height:8px;background:rgba(255,255,255,0.4);border-radius:50%;}
        .penalty-l{position:absolute;bottom:0;left:20px;width:80px;height:100px;border:2px solid rgba(255,255,255,0.18);border-bottom:none;border-radius:4px 4px 0 0;}
        .penalty-r{position:absolute;bottom:0;right:20px;width:80px;height:100px;border:2px solid rgba(255,255,255,0.18);border-bottom:none;border-radius:4px 4px 0 0;}
        .midline{position:absolute;bottom:0;left:0;right:0;height:2px;background:rgba(255,255,255,0.15);}
        .hero-content{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;z-index:2;}
        .trophy{font-size:48px;animation:float 3s ease-in-out infinite;}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .hero-badge{background:rgba(200,16,46,0.9);color:#fff;font-size:11px;font-weight:600;padding:4px 12px;border-radius:20px;letter-spacing:.05em;}
        .hero-title{font-size:26px;font-weight:700;letter-spacing:-.5px;text-shadow:0 2px 20px rgba(0,0,0,.8);}
        .hero-sub{font-size:12px;color:rgba(255,255,255,.55);}
        .nav{display:flex;background:rgba(255,255,255,.04);border-bottom:1px solid rgba(255,255,255,.08);}
        .tab{flex:1;padding:12px 4px;font-size:12px;cursor:pointer;border:none;background:transparent;color:rgba(255,255,255,.4);border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .2s;font-family:inherit;font-weight:500;}
        .tab.on{color:#fff;border-bottom-color:#C8102E;}
        .tab:hover:not(.on){color:rgba(255,255,255,.75);}
        .content{padding:16px;}
        .metrics{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
        .metric{background:linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.03));border:.5px solid rgba(255,255,255,.12);border-radius:14px;padding:16px;}
        .card{background:rgba(255,255,255,.04);border:.5px solid rgba(255,255,255,.1);border-radius:16px;overflow:hidden;}
        .card-hd{padding:14px 16px;border-bottom:.5px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:space-between;}
        .inp{width:100%;padding:11px 14px;border-radius:12px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);color:#fff;font-size:14px;font-family:inherit;outline:none;transition:border .2s;}
        .inp:focus{border-color:rgba(200,16,46,.7);}
        .inp::placeholder{color:rgba(255,255,255,.25);}
        .btn{padding:11px 20px;border-radius:12px;border:none;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:all .15s;}
        .btn-r{background:linear-gradient(135deg,#C8102E,#a00d25);color:#fff;}
        .btn-r:hover{opacity:.88;transform:scale(.98);}
        .btn-ghost{background:transparent;border:.5px solid rgba(255,255,255,.2)!important;color:rgba(255,255,255,.65);}
        .pill{display:inline-flex;align-items:center;gap:5px;padding:5px 12px;border-radius:20px;background:rgba(255,255,255,.07);border:.5px solid rgba(255,255,255,.1);color:rgba(255,255,255,.75);font-size:12px;}
        .gtabs{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:14px;}
        .gtab{font-size:12px;padding:6px 13px;border-radius:20px;cursor:pointer;border:none;font-family:inherit;font-weight:500;transition:all .2s;}
        .gtab-off{background:rgba(255,255,255,.06);color:rgba(255,255,255,.5);}
        .gtab-on{background:#C8102E;color:#fff;}
        .gtab-done{background:rgba(29,158,117,.25);color:#4ade80;border:.5px solid rgba(29,158,117,.4);}
        .match{padding:12px 16px;border-top:.5px solid rgba(255,255,255,.05);display:flex;align-items:center;gap:8px;transition:background .15s;}
        .match:hover{background:rgba(255,255,255,.03);}
        .team{display:flex;align-items:center;gap:5px;flex:1;min-width:0;}
        .tname{font-size:12px;color:rgba(255,255,255,.85);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .btns3{display:flex;gap:4px;flex-shrink:0;}
        .opbtn{width:34px;height:34px;border-radius:10px;cursor:pointer;font-size:12px;font-weight:700;border:none;transition:all .18s;font-family:inherit;}
        .opbtn-off{background:rgba(255,255,255,.07);color:rgba(255,255,255,.35);}
        .opbtn-L{background:linear-gradient(135deg,#1D9E75,#16805e);color:#fff;box-shadow:0 2px 12px rgba(29,158,117,.4);}
        .opbtn-E{background:linear-gradient(135deg,#378ADD,#2568b5);color:#fff;box-shadow:0 2px 12px rgba(55,138,221,.4);}
        .opbtn-V{background:linear-gradient(135deg,#C8102E,#a00d25);color:#fff;box-shadow:0 2px 12px rgba(200,16,46,.4);}
        @keyframes pop{0%{transform:scale(1)}40%{transform:scale(1.35)}100%{transform:scale(1)}}
        .pop{animation:pop .35s ease;}
        .prog-wrap{background:rgba(255,255,255,.08);border-radius:4px;height:5px;overflow:hidden;margin:6px 0;}
        .prog{height:100%;border-radius:4px;transition:width .4s cubic-bezier(.4,0,.2,1);}
        .save-bar{margin-top:14px;}
        .save-btn{width:100%;padding:14px;border-radius:14px;border:none;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .15s;}
        .row-hd{display:grid;grid-template-columns:44px 1fr 70px 100px;padding:10px 16px;background:rgba(255,255,255,.04);font-size:10px;color:rgba(255,255,255,.35);font-weight:600;text-transform:uppercase;letter-spacing:.08em;}
        .row{display:grid;grid-template-columns:44px 1fr 70px 100px;padding:12px 16px;border-top:.5px solid rgba(255,255,255,.05);align-items:center;transition:background .15s;}
        .row:hover{background:rgba(255,255,255,.03);}
        .row.lead{background:rgba(29,158,117,.1);border-left:3px solid #1D9E75;}
        .err{font-size:13px;color:#ff6b6b;margin-top:8px;}
        .suc{font-size:13px;color:#4ade80;margin-top:8px;font-weight:500;}
        .badge{font-size:11px;padding:3px 9px;border-radius:8px;font-weight:600;}
        @keyframes fall{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(300px) rotate(720deg);opacity:0}}
        .vs{font-size:11px;color:rgba(255,255,255,.3);padding:0 2px;}
      `}</style>

      <div className="app">
        <div className="stadium">
          <GrassPattern/>
          <div className="arch"/><div className="penalty-l"/><div className="penalty-r"/>
          <div className="midline"/><div className="center-spot"/>
          <div className="hero-content">
            <div className="hero-badge">FIFA WORLD CUP 2026</div>
            <div className="trophy">🏆</div>
            <h1 className="hero-title">Quiniela Mundial</h1>
            <p className="hero-sub">USA · México · Canadá · 48 equipos · 72 partidos</p>
            <div style={{display:"flex",gap:8,marginTop:4}}>
              <span style={{fontSize:13,fontWeight:700,color:"#C8102E"}}>$250 MXN</span>
              <span style={{fontSize:13,color:"rgba(255,255,255,.3)"}}>por participante</span>
            </div>
          </div>
        </div>

        <nav className="nav">
          {[["inicio","🏠 Inicio"],["predicciones","⚽ Quiniela"],["tabla","🏆 Posiciones"],["admin","⚙️ Admin"]].map(([v,l])=>(
            <button key={v} className={`tab${vista===v?" on":""}`} onClick={()=>{setVista(v);setMsg("");}}>
              {l}
            </button>
          ))}
        </nav>

        <div className="content">
          <div className="metrics">
            <div className="metric">
              <div style={{fontSize:22,marginBottom:6}}>👥</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Participantes</div>
              <div style={{fontSize:22,fontWeight:700}}>{participantes.length}</div>
            </div>
            <div className="metric">
              <div style={{fontSize:22,marginBottom:6}}>🏆</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.4)",marginBottom:4,textTransform:"uppercase",letterSpacing:".06em"}}>Premio</div>
              <div style={{fontSize:22,fontWeight:700}}>${premio.toLocaleString()}</div>
            </div>
          </div>

          {vista==="inicio" && (
            <div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:16}}>
                <button className="btn btn-r" style={{padding:16,fontSize:15,borderRadius:14}} onClick={()=>setVista("predicciones")}>⚽ Llenar quiniela</button>
                <button className="btn btn-ghost" style={{padding:16,fontSize:15,borderRadius:14,border:".5px solid rgba(255,255,255,.15)"}} onClick={()=>setVista("tabla")}>🏆 Posiciones</button>
              </div>
              {participantes.length===0 ? (
                <div className="card" style={{padding:"2rem",textAlign:"center"}}>
                  <div style={{fontSize:40,marginBottom:8}}>🌍</div>
                  <p style={{color:"rgba(255,255,255,.35)",fontSize:13}}>Nadie se ha registrado aún. ¡Sé el primero!</p>
                </div>
              ) : (
                <div className="card">
                  <div className="card-hd">
                    <span style={{fontSize:14,fontWeight:600}}>Participantes</span>
                    <span className="badge" style={{background:"rgba(200,16,46,.25)",color:"#ff8080"}}>{participantes.length}</span>
                  </div>
                  <div style={{padding:"12px 16px",display:"flex",flexWrap:"wrap",gap:8}}>
                    {participantes.map((p,i)=>(
                      <span key={p.nombre} className="pill">
                        {i===0?"🥇":i===1?"🥈":i===2?"🥉":"👤"} {p.nombre}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {vista==="predicciones" && !pActivo && (
            <div className="card" style={{padding:"2rem",textAlign:"center"}}>
              <div style={{fontSize:44,marginBottom:12}}>⚽</div>
              <p style={{fontSize:16,fontWeight:600,marginBottom:6}}>¿Cómo te llamas?</p>
              <p style={{color:"rgba(255,255,255,.4)",fontSize:13,marginBottom:20}}>Escribe tu nombre para comenzar</p>
              <div style={{display:"flex",gap:8,maxWidth:340,margin:"0 auto"}}>
                <input className="inp" value={nombre} onChange={e=>setNombre(e.target.value)}
                  placeholder="Tu nombre" onKeyDown={e=>e.key==="Enter"&&registrar()}/>
                <button className="btn btn-r" onClick={registrar}>Entrar</button>
              </div>
              {msg && <p className="err">{msg}</p>}
            </div>
          )}

          {vista==="predicciones" && pActivo && (
            <div>
              <div style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <p style={{fontSize:15,fontWeight:600}}>{pActivo.nombre}</p>
                    <p style={{fontSize:11,color:"rgba(255,255,255,.4)",marginTop:2}}>{Object.keys(preds).length}/{PARTIDOS.length} predicciones · {pct}%</p>
                  </div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    {[["#1D9E75","Local"],["#378ADD","Empate"],["#C8102E","Visita"]].map(([c,lab])=>(
                      <span key={lab} style={{display:"flex",alignItems:"center",gap:4}}>
                        <span style={{width:10,height:10,borderRadius:3,background:c,display:"inline-block"}}/>
                        <span style={{fontSize:10,color:"rgba(255,255,255,.4)"}}>{lab}</span>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="prog-wrap">
                  <div className="prog" style={{width:`${pct}%`,background:pct===100?"linear-gradient(90deg,#1D9E75,#4ade80)":"linear-gradient(90deg,#C8102E,#ff6b7a)"}}/>
                </div>
              </div>

              <div className="gtabs">
                {FASES.map(g=>{
                  const pf=PARTIDOS.filter(p=>p.fase===g);
                  const h=pf.filter(p=>preds[p.id]).length;
                  const done=h===pf.length;
                  return (
                    <button key={g} className={`gtab ${grupoActivo===g?"gtab-on":done?"gtab-done":"gtab-off"}`} onClick={()=>setGrupoActivo(g)}>
                      {done?"✓ ":""}{g}{!done&&` ${h}/6`}
                    </button>
                  );
                })}
              </div>

              <div className="card">
                <div className="card-hd">
                  <span style={{fontSize:13,fontWeight:600}}>Grupo {grupoActivo}</span>
                  <div style={{display:"flex",gap:4,alignItems:"center"}}>
                    {GRUPOS_INFO[grupoActivo].map((eq,i)=>(
                      <span key={eq}>{fl(eq)}{i<3&&<span className="vs">·</span>}</span>
                    ))}
                  </div>
                </div>
                {PARTIDOS.filter(p=>p.fase===grupoActivo).map((p,i)=>{
                  const val=preds[p.id];
                  return (
                    <div key={p.id} className="match">
                      <span style={{fontSize:11,color:"rgba(255,255,255,.3)",minWidth:38,flexShrink:0}}>{p.fecha}</span>
                      <div className="team" style={{justifyContent:"flex-end"}}>
                        <span className="tname" style={{textAlign:"right"}}>{p.local}</span>
                        {fl(p.local)}
                      </div>
                      <div className="btns3">
                        {[{v:"local",l:"L"},{v:"empate",l:"E"},{v:"visita",l:"V"}].map(op=>(
                          <button key={op.v} className={`opbtn ${val===op.v?`opbtn-${op.l}`:"opbtn-off"} ${bounce===p.id&&val===op.v?"pop":""}`}
                            onClick={()=>pick(p.id,op.v)}>{op.l}</button>
                        ))}
                      </div>
                      <div className="team">
                        {fl(p.visitante)}
                        <span className="tname">{p.visitante}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {msg && <p className="err">{msg}</p>}
              <div className="save-bar">
                <button className="save-btn" onClick={guardar} disabled={saving}
                  style={{background:pct===100?"linear-gradient(135deg,#1D9E75,#16805e)":"linear-gradient(135deg,#C8102E,#a00d25)",color:"#fff",opacity:saving?0.7:1}}>
                  {saving?"Guardando...":pct===100?"✅ Guardar quiniela completa":`Guardar — ${Object.keys(preds).length}/${PARTIDOS.length} partidos`}
                </button>
              </div>
            </div>
          )}

          {vista==="exito" && (
            <div style={{position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",overflow:"hidden"}}>
                {confettiPieces.map((c,i)=>(
                  <div key={i} style={{position:"absolute",left:c.left,top:0,width:c.size,height:c.size,background:c.color,borderRadius:"2px",animation:`fall 1.8s ${c.delay} ease-in forwards`}}/>
                ))}
              </div>
              <div className="card" style={{padding:"3rem 1.5rem",textAlign:"center"}}>
                <div style={{fontSize:56,marginBottom:12,animation:"float 3s ease-in-out infinite"}}>🏆</div>
                <h2 style={{fontSize:22,fontWeight:700,marginBottom:8}}>¡Quiniela guardada!</h2>
                <p style={{color:"rgba(255,255,255,.45)",fontSize:14,marginBottom:24}}>Ya estás en la competencia. ¡Buena suerte!</p>
                <div style={{display:"flex",gap:10,justifyContent:"center"}}>
                  <button className="btn btn-ghost" style={{border:".5px solid rgba(255,255,255,.2)"}} onClick={()=>setVista("predicciones")}>Registrar otro</button>
                  <button className="btn btn-r" onClick={()=>setVista("tabla")}>Ver posiciones →</button>
                </div>
              </div>
            </div>
          )}

          {vista==="tabla" && (
            <div>
              <p style={{fontSize:16,fontWeight:600,marginBottom:14}}>Tabla de posiciones</p>
              {ganadores.length>0 && (
                <div style={{background:"rgba(29,158,117,.12)",border:"1px solid rgba(29,158,117,.3)",borderRadius:14,padding:"14px 16px",marginBottom:14,display:"flex",gap:12,alignItems:"center"}}>
                  <span style={{fontSize:32}}>🥇</span>
                  <div>
                    <p style={{fontSize:14,fontWeight:600,color:"#4ade80"}}>{ganadores.map(g=>g.nombre).join(" · ")}</p>
                    <p style={{fontSize:12,color:"rgba(74,222,128,.7)",marginTop:2}}>
                      {maxAciertos} aciertos · Premio: <strong>${premioPorGanador.toLocaleString()} MXN</strong>
                      {ganadores.length>1?` ÷ ${ganadores.length}`:""}
                    </p>
                  </div>
                </div>
              )}
              {participantes.length===0 ? (
                <div className="card" style={{padding:"2rem",textAlign:"center",color:"rgba(255,255,255,.35)",fontSize:14}}>Aún no hay participantes.</div>
              ) : (
                <div className="card">
                  <div className="row-hd">
                    <span>#</span><span>Participante</span>
                    <span style={{textAlign:"center"}}>Aciertos</span>
                    <span style={{textAlign:"right"}}>Premio</span>
                  </div>
                  {tabla.map((p,i)=>{
                    const lead=p.aciertos===maxAciertos&&maxAciertos>0;
                    return (
                      <div key={p.nombre} className={`row${lead?" lead":""}`}>
                        <span style={{fontSize:i<3?20:13,color:i>=3?"rgba(255,255,255,.3)":"#fff"}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":i+1}</span>
                        <span style={{fontSize:14,fontWeight:lead?600:400,color:lead?"#4ade80":"rgba(255,255,255,.85)"}}>{p.nombre}</span>
                        <span style={{fontSize:16,textAlign:"center",fontWeight:700,color:lead?"#4ade80":"#fff"}}>{p.aciertos}</span>
                        <span style={{fontSize:13,textAlign:"right",fontWeight:lead?600:400,color:lead?"#4ade80":"rgba(255,255,255,.3)"}}>{lead?`$${premioPorGanador.toLocaleString()}`:"—"}</span>
                      </div>
                    );
                  })}
                </div>
              )}
              <p style={{fontSize:11,color:"rgba(255,255,255,.2)",marginTop:10,textAlign:"center"}}>Se actualiza cada 30 segundos</p>
            </div>
          )}

          {vista==="admin" && !adminOk && (
            <div className="card" style={{padding:"2rem",maxWidth:340}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
                <span style={{fontSize:30}}>🔐</span>
                <div>
                  <p style={{fontSize:16,fontWeight:600}}>Panel admin</p>
                  <p style={{fontSize:12,color:"rgba(255,255,255,.35)",marginTop:2}}>Solo el organizador</p>
                </div>
              </div>
              <input type="password" className="inp" value={adminInput} placeholder="Contraseña"
                onChange={e=>setAdminInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&entrarAdmin()} style={{marginBottom:10}}/>
              {adminErr && <p className="err" style={{marginBottom:8}}>Contraseña incorrecta</p>}
              <button className="btn btn-r" onClick={entrarAdmin} style={{width:"100%"}}>Entrar</button>
            </div>
          )}

          {vista==="admin" && adminOk && (
            <div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:20}}>⚙️</span>
                  <p style={{fontSize:16,fontWeight:600}}>Panel admin</p>
                </div>
                <button onClick={()=>{setAdminOk(false);setAdminInput("");setVista("inicio");setAdminTab("resultados");}}
                  style={{fontSize:12,padding:"6px 14px",borderRadius:8,border:".5px solid rgba(255,80,80,.4)",background:"rgba(255,80,80,.1)",color:"#ff8080",cursor:"pointer",fontFamily:"inherit"}}>
                  🔒 Cerrar sesión
                </button>
              </div>

              {/* Tabs admin */}
              <div style={{display:"flex",gap:4,marginBottom:16,background:"rgba(255,255,255,.04)",borderRadius:12,padding:4}}>
                {[["resultados","⚽ Resultados"],["quinielas","👥 Quinielas"]].map(([t,l])=>(
                  <button key={t} onClick={()=>setAdminTab(t)} style={{flex:1,padding:"8px",borderRadius:9,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:500,
                    background:adminTab===t?"#C8102E":"transparent",color:adminTab===t?"#fff":"rgba(255,255,255,.5)"}}>
                    {l}
                  </button>
                ))}
              </div>

              {/* TAB RESULTADOS */}
              {adminTab==="resultados" && (
                <div>
                  <div className="gtabs">
                    {FASES.map(g=>{
                      const pf=PARTIDOS.filter(p=>p.fase===g);
                      const h=pf.filter(p=>resultados[p.id]||resTemp[p.id]).length;
                      const done=h===pf.length;
                      return (
                        <button key={g} className={`gtab ${grupoActivo===g?"gtab-on":done?"gtab-done":"gtab-off"}`} onClick={()=>setGrupoActivo(g)}>
                          {done?"✓ ":""}{g}{!done&&` ${h}/6`}
                        </button>
                      );
                    })}
                  </div>
                  <div className="card">
                    <div className="card-hd">
                      <span style={{fontSize:13,fontWeight:600}}>Grupo {grupoActivo}</span>
                      <div style={{display:"flex",gap:4,alignItems:"center"}}>
                        {GRUPOS_INFO[grupoActivo].map((eq,i)=>(
                          <span key={eq}>{fl(eq)}{i<3&&<span className="vs">·</span>}</span>
                        ))}
                      </div>
                    </div>
                    {PARTIDOS.filter(p=>p.fase===grupoActivo).map((p,i)=>{
                      const actual=resTemp[p.id]??resultados[p.id];
                      return (
                        <div key={p.id} className="match">
                          <span style={{fontSize:11,color:"rgba(255,255,255,.3)",minWidth:38,flexShrink:0}}>{p.fecha}</span>
                          <div className="team" style={{justifyContent:"flex-end"}}>
                            <span className="tname" style={{textAlign:"right"}}>{p.local}</span>
                            {fl(p.local)}
                          </div>
                          <div className="btns3">
                            {[{v:"local",l:"L"},{v:"empate",l:"E"},{v:"visita",l:"V"}].map(op=>(
                              <button key={op.v} className={`opbtn ${actual===op.v?`opbtn-${op.l}`:"opbtn-off"}`}
                                onClick={()=>setResTemp(r=>({...r,[p.id]:op.v}))}>{op.l}</button>
                            ))}
                          </div>
                          <div className="team">
                            {fl(p.visitante)}
                            <span className="tname">{p.visitante}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {msg && <p className="suc">{msg}</p>}
                  <div className="save-bar">
                    <button className="save-btn" onClick={guardarRes} disabled={saving}
                      style={{background:"linear-gradient(135deg,#1D9E75,#16805e)",color:"#fff",opacity:saving?0.7:1}}>
                      {saving?"Guardando...":"Guardar resultados del Grupo "+grupoActivo}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB QUINIELAS */}
              {adminTab==="quinielas" && (
                <div>
                  <p style={{fontSize:13,color:"rgba(255,255,255,.4)",marginBottom:12}}>Aquí puedes borrar la quiniela de cualquier participante.</p>
                  {participantes.length===0 ? (
                    <div className="card" style={{padding:"2rem",textAlign:"center",color:"rgba(255,255,255,.35)",fontSize:14}}>No hay participantes.</div>
                  ) : (
                    <div className="card">
                      {participantes.map((p,i)=>(
                        <div key={p.nombre} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 16px",borderTop:i===0?"none":".5px solid rgba(255,255,255,.05)"}}>
                          <div style={{display:"flex",alignItems:"center",gap:8}}>
                            <span style={{fontSize:i<3?18:13}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":"👤"}</span>
                            <span style={{fontSize:14,fontWeight:500}}>{p.nombre}</span>
                            <span style={{fontSize:11,color:"rgba(255,255,255,.3)"}}>{calcAciertos(p)} aciertos</span>
                          </div>
                          <button onClick={()=>borrarParticipante(p.nombre)} disabled={saving}
                            style={{fontSize:12,padding:"6px 14px",borderRadius:8,border:".5px solid rgba(255,80,80,.4)",background:"rgba(255,80,80,.1)",color:"#ff8080",cursor:"pointer",fontFamily:"inherit"}}>
                            🗑️ Borrar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {msg && <p className="suc">{msg}</p>}
                </div>
              )}
            </div>
          )}
            <div>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                <div style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{fontSize:20}}>⚙️</span>
                  <p style={{fontSize:16,fontWeight:600}}>Panel admin</p>
                </div>
                <button onClick={()=>{setAdminOk(false);setAdminInput("");setVista("inicio");setAdminTab("resultados");setEditando(null);}}
                  style={{fontSize:12,padding:"6px 14px",borderRadius:8,border:".5px solid rgba(255,80,80,.4)",background:"rgba(255,80,80,.1)",color:"#ff8080",cursor:"pointer",fontFamily:"inherit"}}>
                  🔒 Cerrar sesión
                </button>
              </div>

              {/* Tabs admin */}
              <div style={{display:"flex",gap:4,marginBottom:16,background:"rgba(255,255,255,.04)",borderRadius:12,padding:4}}>
                {[["resultados","⚽ Resultados"],["quinielas","👥 Quinielas"]].map(([t,l])=>(
                  <button key={t} onClick={()=>setAdminTab(t)} style={{flex:1,padding:"8px",borderRadius:9,border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:500,
                    background:adminTab===t?"#C8102E":"transparent",color:adminTab===t?"#fff":"rgba(255,255,255,.5)"}}>
                    {l}
                  </button>
                ))}
              </div>

              {/* TAB RESULTADOS */}
              {adminTab==="resultados" && (
                <div>
                  <div className="gtabs">
                    {FASES.map(g=>{
                      const pf=PARTIDOS.filter(p=>p.fase===g);
                      const h=pf.filter(p=>resultados[p.id]||resTemp[p.id]).length;
                      const done=h===pf.length;
                      return (
                        <button key={g} className={`gtab ${grupoActivo===g?"gtab-on":done?"gtab-done":"gtab-off"}`} onClick={()=>setGrupoActivo(g)}>
                          {done?"✓ ":""}{g}{!done&&` ${h}/6`}
                        </button>
                      );
                    })}
                  </div>
                  <div className="card">
                    <div className="card-hd">
                      <span style={{fontSize:13,fontWeight:600}}>Grupo {grupoActivo}</span>
                      <div style={{display:"flex",gap:4,alignItems:"center"}}>
                        {GRUPOS_INFO[grupoActivo].map((eq,i)=>(
                          <span key={eq}>{fl(eq)}{i<3&&<span className="vs">·</span>}</span>
                        ))}
                      </div>
                    </div>
                    {PARTIDOS.filter(p=>p.fase===grupoActivo).map((p,i)=>{
                      const actual=resTemp[p.id]??resultados[p.id];
                      return (
                        <div key={p.id} className="match">
                          <span style={{fontSize:11,color:"rgba(255,255,255,.3)",minWidth:38,flexShrink:0}}>{p.fecha}</span>
                          <div className="team" style={{justifyContent:"flex-end"}}>
                            <span className="tname" style={{textAlign:"right"}}>{p.local}</span>
                            {fl(p.local)}
                          </div>
                          <div className="btns3">
                            {[{v:"local",l:"L"},{v:"empate",l:"E"},{v:"visita",l:"V"}].map(op=>(
                              <button key={op.v} className={`opbtn ${actual===op.v?`opbtn-${op.l}`:"opbtn-off"}`}
                                onClick={()=>setResTemp(r=>({...r,[p.id]:op.v}))}>{op.l}</button>
                            ))}
                          </div>
                          <div className="team">
                            {fl(p.visitante)}
                            <span className="tname">{p.visitante}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {msg && <p className="suc">{msg}</p>}
                  <div className="save-bar">
                    <button className="save-btn" onClick={guardarRes} disabled={saving}
                      style={{background:"linear-gradient(135deg,#1D9E75,#16805e)",color:"#fff",opacity:saving?0.7:1}}>
                      {saving?"Guardando...":"Guardar resultados del Grupo "+grupoActivo}
                    </button>
                  </div>
                </div>
              )}

              {/* TAB QUINIELAS */}
              {adminTab==="quinielas" && !editando && (
                <div>
                  <p style={{fontSize:13,color:"rgba(255,255,255,.4)",marginBottom:12}}>Selecciona una quiniela para editar o borrar.</p>
                  {participantes.length===0 ? (
                    <div className="card" style={{padding:"2rem",textAlign:"center",color:"rgba(255,255,255,.35)",fontSize:14}}>No hay participantes.</div>
                  ) : (
                    <div className="card">
                      {participantes.map((p,i)=>(
                        <div key={p.nombre} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderTop:i===0?"none":".5px solid rgba(255,255,255,.05)"}}>
                          <span style={{fontSize:14,fontWeight:500}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":"👤"} {p.nombre}</span>
                          <div style={{display:"flex",gap:8}}>
                            <button onClick={()=>{setEditando(p);setPredsEdit({...p.predicciones});setGrupoActivo("A");}}
                              style={{fontSize:12,padding:"5px 12px",borderRadius:8,border:".5px solid rgba(55,138,221,.4)",background:"rgba(55,138,221,.1)",color:"#7bb8f5",cursor:"pointer",fontFamily:"inherit"}}>
                              ✏️ Editar
                            </button>
                            <button onClick={()=>borrarParticipante(p.nombre)}
                              style={{fontSize:12,padding:"5px 12px",borderRadius:8,border:".5px solid rgba(255,80,80,.4)",background:"rgba(255,80,80,.1)",color:"#ff8080",cursor:"pointer",fontFamily:"inherit"}}>
                              🗑️ Borrar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {msg && <p className="suc">{msg}</p>}
                </div>
              )}

              {/* EDITAR QUINIELA */}
              {adminTab==="quinielas" && editando && (
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
                    <button onClick={()=>setEditando(null)} style={{fontSize:12,padding:"5px 12px",borderRadius:8,border:".5px solid rgba(255,255,255,.2)",background:"transparent",color:"rgba(255,255,255,.6)",cursor:"pointer",fontFamily:"inherit"}}>
                      ← Volver
                    </button>
                    <p style={{fontSize:14,fontWeight:600}}>Editando: {editando.nombre}</p>
                  </div>
                  <div className="gtabs">
                    {FASES.map(g=>{
                      const pf=PARTIDOS.filter(p=>p.fase===g);
                      const h=pf.filter(p=>predsEdit[p.id]).length;
                      const done=h===pf.length;
                      return (
                        <button key={g} className={`gtab ${grupoActivo===g?"gtab-on":done?"gtab-done":"gtab-off"}`} onClick={()=>setGrupoActivo(g)}>
                          {done?"✓ ":""}{g}{!done&&` ${h}/6`}
                        </button>
                      );
                    })}
                  </div>
                  <div className="card">
                    <div className="card-hd">
                      <span style={{fontSize:13,fontWeight:600}}>Grupo {grupoActivo}</span>
                    </div>
                    {PARTIDOS.filter(p=>p.fase===grupoActivo).map((p,i)=>{
                      const val=predsEdit[p.id];
                      return (
                        <div key={p.id} className="match">
                          <span style={{fontSize:11,color:"rgba(255,255,255,.3)",minWidth:38,flexShrink:0}}>{p.fecha}</span>
                          <div className="team" style={{justifyContent:"flex-end"}}>
                            <span className="tname" style={{textAlign:"right"}}>{p.local}</span>
                            {fl(p.local)}
                          </div>
                          <div className="btns3">
                            {[{v:"local",l:"L"},{v:"empate",l:"E"},{v:"visita",l:"V"}].map(op=>(
                              <button key={op.v} className={`opbtn ${val===op.v?`opbtn-${op.l}`:"opbtn-off"}`}
                                onClick={()=>setPredsEdit(pr=>({...pr,[p.id]:op.v}))}>{op.l}</button>
                            ))}
                          </div>
                          <div className="team">
                            {fl(p.visitante)}
                            <span className="tname">{p.visitante}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {msg && <p className="suc">{msg}</p>}
                  <div className="save-bar">
                    <button className="save-btn" onClick={guardarEdicion} disabled={saving}
                      style={{background:"linear-gradient(135deg,#378ADD,#2568b5)",color:"#fff",opacity:saving?0.7:1}}>
                      {saving?"Guardando...":"💾 Guardar cambios de "+editando.nombre}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
