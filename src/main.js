import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./game.js";

gsap.registerPlugin(ScrollTrigger);

// ================= FONDO 3D (ESTRELLAS) =================
const canvas = document.querySelector("#bg");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0a);
scene.fog = new THREE.Fog(0x0a0a0a, 15, 80);

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1, 18);

const renderer = new THREE.WebGLRenderer({
  canvas,
  powerPreference: "high-performance",
  antialias: false
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));

// Luces
scene.add(new THREE.AmbientLight(0xffffff, 0.5));
const pointLight = new THREE.PointLight(0xffffff, 0.4, 50);
pointLight.position.set(5, 8, 10);
scene.add(pointLight);

// Estrellas
function createStars(count, spread, size, opacity) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const radius = spread * Math.pow(Math.random(), 0.6);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    positions[i*3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i*3+1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i*3+2] = radius * Math.cos(phi);
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    size,
    color: 0xffffff,
    transparent: true,
    opacity,
    depthWrite: false
  });
  return new THREE.Points(geometry, material);
}

const starsFar = createStars(1200, 500, 0.02, 0.25);
const starsMid = createStars(800, 300, 0.03, 0.45);
const starsNear = createStars(400, 180, 0.05, 0.8);
scene.add(starsFar, starsMid, starsNear);
const dust = createStars(400, 200, 0.015, 0.15);
scene.add(dust);

// Nebulosa
function createNebula() {
  const geometry = new THREE.SphereGeometry(25, 16, 16);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.015,
    side: THREE.BackSide
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.z = -30;
  return mesh;
}
const nebula = createNebula();
scene.add(nebula);

// Overlay
const overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.pointerEvents = "none";
overlay.style.zIndex = "10";
overlay.style.backgroundImage = `
  radial-gradient(circle at center, transparent 55%, rgba(0,0,0,0.75)),
  repeating-linear-gradient(
    0deg,
    rgba(255,255,255,0.02) 0px,
    rgba(0,0,0,0.02) 2px,
    transparent 4px
  )
`;
overlay.style.mixBlendMode = "overlay";
overlay.style.opacity = "0.6";
document.body.appendChild(overlay);

// Parallax mouse
let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
window.addEventListener("mousemove", (e) => {
  targetX = (e.clientX / window.innerWidth - 0.5) * 2;
  targetY = (e.clientY / window.innerHeight - 0.5) * 2;
});

// Animación fondo
let lastTime = 0, fps = 60;
function animateBackground(time) {
  requestAnimationFrame(animateBackground);
  const delta = time - lastTime;
  if (delta < 1000 / fps) return;
  lastTime = time;

  mouseX += (targetX - mouseX) * 0.04;
  mouseY += (targetY - mouseY) * 0.04;

  camera.position.x = mouseX * 1.5;
  camera.position.y = -mouseY * 0.8 + 1;
  camera.lookAt(0, 0, -5);

  starsFar.rotation.y += 0.00002;
  starsMid.rotation.y += 0.00005;
  starsNear.rotation.y += 0.0001;
  dust.rotation.y += 0.00015;

  const t = time * 0.001;
  starsNear.material.opacity = 0.75 + Math.sin(t * 2) * 0.1;
  starsMid.material.opacity = 0.45 + Math.sin(t * 1.5) * 0.05;

  nebula.rotation.y += 0.00005;
  nebula.material.opacity = 0.012 + Math.sin(time * 0.0003) * 0.005;

  renderer.render(scene, camera);
}
animateBackground();

// Resize fondo
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ================= TRANSLATIONS =================
const translations = {
  es: {
    nav: {
      logo: "Franco Lisi",
      home: "Inicio",
      about: "Sobre mí",
      stack: "Stack",
      experience: "Experiencia",
      projects: "Proyectos",
      projects_web: "Web",
      projects_gamedev: "GameDev",
      gamedev: "Videojuegos",
      github: "GitHub",
      tour: "3D",
      contact: "Contacto"
    },
    hero: {
      available: "Disponible para trabajar",
      greeting: "Hola, soy",
      typewriter: "Senior Full-Stack Developer",
      subtitle: "Desarrollo plataformas escalables, e-commerce, APIs robustas y sistemas empresariales."
    },
    about: {
      title: "Sobre mí",
      summary: "Full Stack Developer con experiencia en desarrollo de aplicaciones web escalables, plataformas e-commerce y sistemas de integración HR. Especializado en APIs, arquitectura backend y rendimiento. También exploro el desarrollo de videojuegos y mods."
    },
    stack: {
      title: "Stack Tecnológico",
      languages: "Lenguajes",
      frontend: "Frontend & Librerías",
      backend: "Backend & APIs",
      databases: "Bases de Datos",
      gamedev: "Game Development",
      tools: "Herramientas y Otros"
    },
    exp: {
      main_title: "Experiencia Profesional",
      freelance: {
        title: "Senior Full-Stack Developer",
        company: "Freelance · Remoto",
        date: "2026 — Actualidad",
        item1: "Desarrollo de plataformas e-commerce personalizadas",
        item2: "Arquitecturas backend escalables",
        item3: "Integraciones empresariales (HR, APIs, pagos)"
      },
      accesswork: {
        title: "Full-Stack Developer",
        company: "AccessWork",
        date: "2019 — 2025",
        item1: "Desarrollo de APIs REST",
        item2: "Integración de pagos y logística",
        item3: "Optimización de sistemas y bases de datos"
      }
    },
    gamedev: {
      title: "Videojuegos"
    },
    extra: {
      title_other: "Otras Experiencias",
      lua: {
        title: "🎮 Lua en entornos de videojuegos (FiveM, Roblox, WoW, Garry's Mod, Love2D)",
        desc: "Creación de scripts y modificaciones para servidores de FiveM (GTA V), experiencias personalizadas en Roblox, addons para World of Warcraft y Garry's Mod, y pequeños juegos con el framework Love2D. El desarrollo en estos entornos enseña a trabajar con APIs específicas, optimización en tiempo real, y lógica de eventos asíncronos. Se adquiere experiencia en integración con bases de datos (MySQL para FiveM) y manejo de colisiones, físicas y UI personalizada."
      },
      csharp: {
        title: "🎮 Desarrollo de videojuegos con C# (Unity) y Unreal Engine",
        desc: "Creación de prototipos y proyectos completos utilizando Unity (C#) y Unreal Engine (Blueprints/C++). Se aprende programación orientada a objetos aplicada a juegos, patrones de diseño como Singleton y Observer, manejo de físicas, animaciones, IA básica y optimización de renders. Estos conocimientos son transferibles a aplicaciones interactivas y simulaciones."
      },
      discord: {
        title: "🤖 Discord Bots con Node.js y Discord.js",
        desc: "Desarrollo de bots modulares para comunidades de Discord, incluyendo sistemas de moderación, economía, juegos por comandos y conexión con APIs externas. Se trabaja con manejo de eventos, colas de mensajes, bases de datos (MongoDB/MySQL) y despliegue en servidores en la nube. La experiencia refuerza el trabajo con WebSockets y arquitectura orientada a eventos."
      },
      wp: {
        title: "🔌 Plugins de WordPress desde cero (PHP)",
        desc: "Creación de plugins personalizados para WordPress utilizando hooks, acciones y filtros. Se implementan funcionalidades como custom post types, campos personalizados, integración con pasarelas de pago y optimización de rendimiento. Se adquiere conocimiento profundo del ecosistema WordPress y buenas prácticas de seguridad."
      },
      rust: {
        title: "👁️ Sistema de Eye Tracking con Rust",
        desc: "Prototipo de software de seguimiento ocular utilizando la librería `tobii` y análisis de video en tiempo real con Rust. Se exploran conceptos de procesamiento de imágenes, concurrencia segura y rendimiento de bajo nivel. Este proyecto demuestra la capacidad de trabajar con hardware especializado y algoritmos complejos."
      },
      asoc: {
        title: "🏛️ Plugin de gestión para asociaciones civiles (Next.js, Redux, MySQL)",
        desc: "Desarrollo de un sistema completo para la administración de asociaciones civiles, incluyendo gestión de socios, cuotas, eventos y generación de informes. Construido con Next.js en el frontend, Redux para el estado global y MySQL como base de datos. Se implementó autenticación JWT, roles de usuario y una API RESTful."
      },
      lang: {
        title: "💬 Language Learning Chat App (Next.js, Redux, MySQL)",
        desc: "Aplicación de chat en tiempo real para el aprendizaje de idiomas, con corrección gramatical automática, videollamadas y ejercicios interactivos. Utiliza Next.js, Redux Toolkit, MySQL con Sequelize, y WebSockets para mensajería instantánea. La experiencia incluye diseño de bases de datos escalables y optimización de consultas."
      }
    },
    projects: {
      web_title: "Proyectos Web",
      gamedev_title: "Proyectos de Videojuegos",
      ecommerce: { title: "E-commerce Platform", desc: "Plataforma completa con pagos e inventario." },
      hr: { title: "HR Integration System", desc: "Automatización de procesos empresariales." },
      api: { title: "API Backend", desc: "Arquitectura escalable y segura." },
      portfolio: { title: "3D Portfolio", desc: "Experiencia interactiva con Three.js." },
      discord: { title: "Discord Moderation Bot", desc: "Bot con sistema de advertencias, logs y auto-mod." },
      wp: { title: "WordPress Membership Plugin", desc: "Plugin de membresías con pagos recurrentes." },
      asoc: { title: "Asociación Civil Manager", desc: "Plataforma de gestión de socios y cuotas." },
      langchat: { title: "LangChat App", desc: "Red social para intercambio de idiomas con corrección automática." },
      fivem: { title: "FiveM Roleplay Server", desc: "Scripts avanzados en Lua para servidor de GTA V con economía y empleos." },
      roblox: { title: "Roblox Obby Creator", desc: "Juego de obstáculos con niveles personalizados y sistema de guardado." },
      unity: { title: "Unity 2D Platformer", desc: "Juego completo con físicas, enemigos y niveles." },
      unreal: { title: "Unreal Engine Prototype", desc: "Demo de mecánicas de sigilo en primera persona." },
      eyetracking: { title: "Eye Tracking Analyzer", desc: "Software en Rust para análisis de atención visual." }
    },
    github: {
      title: "GitHub & LinkedIn",
      text_github: "GitHub",
      text_linkedin: "LinkedIn"
    },
    tour: {
      title: "Explora mi mundo 3D",
      play: "▶ Jugar"
    },
    footer: {
      copyright: "© 2026 Franco Martin Lisi",
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Email"
    }
  },
  en: {
    nav: {
      logo: "Franco Lisi",
      home: "Home",
      about: "About",
      stack: "Stack",
      experience: "Experience",
      projects: "Projects",
      projects_web: "Web",
      projects_gamedev: "GameDev",
      gamedev: "Game Dev",
      github: "GitHub",
      tour: "3D",
      contact: "Contact"
    },
    hero: {
      available: "Available for work",
      greeting: "Hello, I'm",
      typewriter: "Senior Full-Stack Developer",
      subtitle: "I develop scalable platforms, e-commerce, robust APIs and enterprise systems."
    },
    about: {
      title: "About me",
      summary: "Full Stack Developer with experience in scalable web applications, e-commerce platforms and HR integration systems. Specialized in APIs, backend architecture and performance. I also explore game development and modding."
    },
    stack: {
      title: "Tech Stack",
      languages: "Languages",
      frontend: "Frontend & Libraries",
      backend: "Backend & APIs",
      databases: "Databases",
      gamedev: "Game Development",
      tools: "Tools & Others"
    },
    exp: {
      main_title: "Professional Experience",
      freelance: {
        title: "Senior Full-Stack Developer",
        company: "Freelance · Remote",
        date: "2026 — Present",
        item1: "Development of custom e-commerce platforms",
        item2: "Scalable backend architectures",
        item3: "Business integrations (HR, APIs, payments)"
      },
      accesswork: {
        title: "Full-Stack Developer",
        company: "AccessWork",
        date: "2019 — 2025",
        item1: "REST API development",
        item2: "Payment and logistics integration",
        item3: "System and database optimization"
      }
    },
    gamedev: {
      title: "Game Development"
    },
    extra: {
      title_other: "Other Experiences",
      lua: {
        title: "🎮 Lua in gaming environments (FiveM, Roblox, WoW, Garry's Mod, Love2D)",
        desc: "Creation of scripts and mods for FiveM (GTA V) servers, custom experiences in Roblox, addons for World of Warcraft and Garry's Mod, and small games with the Love2D framework. Development in these environments teaches working with specific APIs, real-time optimization, and asynchronous event logic. Experience is gained in database integration (MySQL for FiveM) and handling collisions, physics, and custom UI."
      },
      csharp: {
        title: "🎮 Game development with C# (Unity) and Unreal Engine",
        desc: "Creation of prototypes and complete projects using Unity (C#) and Unreal Engine (Blueprints/C++). Object-oriented programming applied to games, design patterns such as Singleton and Observer, physics handling, animations, basic AI and render optimization are learned. This knowledge is transferable to interactive applications and simulations."
      },
      discord: {
        title: "🤖 Discord Bots with Node.js and Discord.js",
        desc: "Development of modular bots for Discord communities, including moderation systems, economy, command games and connection with external APIs. Work with event handling, message queues, databases (MongoDB/MySQL) and deployment on cloud servers. The experience reinforces work with WebSockets and event-driven architecture."
      },
      wp: {
        title: "🔌 WordPress plugins from scratch (PHP)",
        desc: "Creation of custom plugins for WordPress using hooks, actions and filters. Functionalities such as custom post types, custom fields, payment gateway integration and performance optimization are implemented. Deep knowledge of the WordPress ecosystem and good security practices are acquired."
      },
      rust: {
        title: "👁️ Eye Tracking System with Rust",
        desc: "Prototype eye-tracking software using the `tobii` library and real-time video analysis with Rust. Concepts of image processing, safe concurrency and low-level performance are explored. This project demonstrates the ability to work with specialized hardware and complex algorithms."
      },
      asoc: {
        title: "🏛️ Management plugin for civil associations (Next.js, Redux, MySQL)",
        desc: "Development of a complete system for the administration of civil associations, including member management, fees, events and report generation. Built with Next.js on the frontend, Redux for global state and MySQL as database. JWT authentication, user roles and a RESTful API were implemented."
      },
      lang: {
        title: "💬 Language Learning Chat App (Next.js, Redux, MySQL)",
        desc: "Real-time chat application for language learning, with automatic grammar correction, video calls and interactive exercises. Uses Next.js, Redux Toolkit, MySQL with Sequelize, and WebSockets for instant messaging. The experience includes scalable database design and query optimization."
      }
    },
    projects: {
      web_title: "Web Projects",
      gamedev_title: "Game Projects",
      ecommerce: { title: "E-commerce Platform", desc: "Complete platform with payments and inventory." },
      hr: { title: "HR Integration System", desc: "Business process automation." },
      api: { title: "API Backend", desc: "Scalable and secure architecture." },
      portfolio: { title: "3D Portfolio", desc: "Interactive experience with Three.js." },
      discord: { title: "Discord Moderation Bot", desc: "Bot with warning system, logs and auto-mod." },
      wp: { title: "WordPress Membership Plugin", desc: "Membership plugin with recurring payments." },
      asoc: { title: "Asociación Civil Manager", desc: "Member and fee management platform." },
      langchat: { title: "LangChat App", desc: "Social network for language exchange with automatic correction." },
      fivem: { title: "FiveM Roleplay Server", desc: "Advanced Lua scripts for GTA V server with economy and jobs." },
      roblox: { title: "Roblox Obby Creator", desc: "Obstacle game with custom levels and save system." },
      unity: { title: "Unity 2D Platformer", desc: "Complete game with physics, enemies and levels." },
      unreal: { title: "Unreal Engine Prototype", desc: "First-person stealth mechanics demo." },
      eyetracking: { title: "Eye Tracking Analyzer", desc: "Rust software for visual attention analysis." }
    },
    github: {
      title: "GitHub & LinkedIn",
      text_github: "GitHub",
      text_linkedin: "LinkedIn"
    },
    tour: {
      title: "Explore my 3D world",
      play: "▶ Play"
    },
    footer: {
      copyright: "© 2026 Franco Martin Lisi",
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "Email"
    }
  },
  ja: {
    nav: {
      logo: "フランコ・リシ",
      home: "ホーム",
      about: "私について",
      stack: "スタック",
      experience: "経験",
      projects: "プロジェクト",
      projects_web: "ウェブ",
      projects_gamedev: "ゲーム開発",
      gamedev: "ゲーム開発",
      github: "GitHub",
      tour: "3D",
      contact: "連絡先"
    },
    hero: {
      available: "就業可能",
      greeting: "こんにちは、",
      typewriter: "シニアフルスタック開発者",
      subtitle: "スケーラブルなプラットフォーム、Eコマース、堅牢なAPI、エンタープライズシステムを開発します。"
    },
    about: {
      title: "私について",
      summary: "スケーラブルなWebアプリケーション、Eコマースプラットフォーム、HR統合システムの開発経験を持つフルスタック開発者。API、バックエンドアーキテクチャ、パフォーマンスに特化。ゲーム開発やMOD作成も探求しています。"
    },
    stack: {
      title: "技術スタック",
      languages: "言語",
      frontend: "フロントエンドとライブラリ",
      backend: "バックエンドとAPI",
      databases: "データベース",
      gamedev: "ゲーム開発",
      tools: "ツールなど"
    },
    exp: {
      main_title: "職務経験",
      freelance: {
        title: "シニアフルスタック開発者",
        company: "フリーランス · リモート",
        date: "2026年 — 現在",
        item1: "カスタムEコマースプラットフォームの開発",
        item2: "スケーラブルなバックエンドアーキテクチャ",
        item3: "ビジネス統合（HR、API、決済）"
      },
      accesswork: {
        title: "フルスタック開発者",
        company: "AccessWork",
        date: "2019年 — 2025年",
        item1: "REST API開発",
        item2: "決済・物流統合",
        item3: "システム・データベース最適化"
      }
    },
    gamedev: {
      title: "ゲーム開発"
    },
    extra: {
      title_other: "その他の経験",
      lua: {
        title: "🎮 ゲーム環境でのLua（FiveM、Roblox、WoW、Garry's Mod、Love2D）",
        desc: "FiveM（GTA V）サーバー向けスクリプトやMOD、Robloxでのカスタム体験、World of WarcraftやGarry's Modのアドオン、Love2Dフレームワークを使用した小規模ゲームの作成。これらの環境での開発は、特定のAPI、リアルタイム最適化、非同期イベントロジックを扱うことを教えます。データベース統合（FiveMでのMySQL）、衝突判定、物理演算、カスタムUIの経験を積みます。"
      },
      csharp: {
        title: "🎮 C#（Unity）およびUnreal Engineによるゲーム開発",
        desc: "Unity（C#）およびUnreal Engine（ブループリント/C++）を使用したプロトタイプおよび完全なプロジェクトの作成。ゲームに適用されるオブジェクト指向プログラミング、SingletonやObserverなどのデザインパターン、物理演算、アニメーション、基本AI、レンダリング最適化を学びます。この知識はインタラクティブなアプリケーションやシミュレーションに応用可能です。"
      },
      discord: {
        title: "🤖 Node.jsとDiscord.jsを使ったDiscordボット",
        desc: "Discordコミュニティ向けのモジュール式ボットの開発。モデレーションシステム、経済、コマンドゲーム、外部APIとの連携を含む。イベント処理、メッセージキュー、データベース（MongoDB/MySQL）、クラウドサーバーへのデプロイを扱います。WebSocketとイベント駆動型アーキテクチャの経験を強化します。"
      },
      wp: {
        title: "🔌 WordPressプラグインのスクラッチ開発（PHP）",
        desc: "フック、アクション、フィルターを使用したWordPress用カスタムプラグインの作成。カスタム投稿タイプ、カスタムフィールド、決済ゲートウェイ統合、パフォーマンス最適化などの機能を実装。WordPressエコシステムの深い知識とセキュリティのベストプラクティスを習得します。"
      },
      rust: {
        title: "👁️ Rustによるアイトラッキングシステム",
        desc: "tobiiライブラリとRustによるリアルタイムビデオ分析を使用したアイトラッキングソフトウェアのプロトタイプ。画像処理、安全な並行処理、低レベルパフォーマンスの概念を探求します。このプロジェクトは、特殊なハードウェアと複雑なアルゴリズムを扱う能力を示します。"
      },
      asoc: {
        title: "🏛️ 市民団体管理プラグイン（Next.js、Redux、MySQL）",
        desc: "市民団体の管理のための完全なシステムの開発。会員管理、会費、イベント、レポート生成を含む。フロントエンドにNext.js、グローバル状態にRedux、データベースにMySQLを使用。JWT認証、ユーザーロール、RESTful APIを実装。"
      },
      lang: {
        title: "💬 言語学習チャットアプリ（Next.js、Redux、MySQL）",
        desc: "自動文法修正、ビデオ通話、インタラクティブな演習を備えたリアルタイムチャットアプリケーション。Next.js、Redux Toolkit、MySQL with Sequelize、WebSocketを使用。スケーラブルなデータベース設計とクエリ最適化の経験を含む。"
      }
    },
    projects: {
      web_title: "ウェブプロジェクト",
      gamedev_title: "ゲームプロジェクト",
      ecommerce: { title: "Eコマースプラットフォーム", desc: "決済と在庫管理を備えた完全なプラットフォーム。" },
      hr: { title: "HR統合システム", desc: "ビジネスプロセスの自動化。" },
      api: { title: "APIバックエンド", desc: "スケーラブルで安全なアーキテクチャ。" },
      portfolio: { title: "3Dポートフォリオ", desc: "Three.jsを使ったインタラクティブな体験。" },
      discord: { title: "Discordモデレーションボット", desc: "警告システム、ログ、自動モデレーションを備えたボット。" },
      wp: { title: "WordPressメンバーシッププラグイン", desc: "定期支払い対応のメンバーシッププラグイン。" },
      asoc: { title: "市民団体マネージャー", desc: "会員と会費管理プラットフォーム。" },
      langchat: { title: "LangChatアプリ", desc: "自動修正機能付き言語交換ソーシャルネットワーク。" },
      fivem: { title: "FiveMロールプレイサーバー", desc: "経済と仕事を備えたGTA Vサーバー向け高度なLuaスクリプト。" },
      roblox: { title: "Roblox Obbyクリエイター", desc: "カスタムレベルと保存システムを備えた障害物ゲーム。" },
      unity: { title: "Unity 2Dプラットフォーマー", desc: "物理演算、敵、レベルを備えた完全なゲーム。" },
      unreal: { title: "Unreal Engineプロトタイプ", desc: "一人称ステルスメカニクスのデモ。" },
      eyetracking: { title: "アイトラッキングアナライザー", desc: "視覚的注意分析のためのRustソフトウェア。" }
    },
    github: {
      title: "GitHub & LinkedIn",
      text_github: "GitHub",
      text_linkedin: "LinkedIn"
    },
    tour: {
      title: "私の3Dワールドを探検",
      play: "▶ プレイ"
    },
    footer: {
      copyright: "© 2026 フランコ・マルティン・リシ",
      github: "GitHub",
      linkedin: "LinkedIn",
      email: "メール"
    }
  }
};

// ================= I18N, TYPEWRITER Y PLAYER (todo en un DOMContentLoaded) =================
document.addEventListener('DOMContentLoaded', () => {
  // ---------- I18N ----------
  const languageSelector = document.getElementById('languageSelector');
  const currentLangDiv = document.getElementById('currentLang');
  const currentFlag = document.getElementById('currentFlag');
  const langOptions = document.getElementById('langOptions');
  const langOptionDivs = document.querySelectorAll('.lang-option');

  let currentLang = localStorage.getItem('preferredLang') || 'es';
  applyTranslation(currentLang);
  updateFlag(currentLang);

  currentLangDiv.addEventListener('click', (e) => {
    e.stopPropagation();
    languageSelector.classList.toggle('open');
  });

  document.addEventListener('click', () => {
    languageSelector.classList.remove('open');
  });

  langOptionDivs.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = opt.getAttribute('data-lang');
      if (lang) {
        currentLang = lang;
        localStorage.setItem('preferredLang', lang);
        applyTranslation(lang);
        updateFlag(lang);
        languageSelector.classList.remove('open');
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
      }
    });
  });

  function updateFlag(lang) {
    const flags = { es: 'es', en: 'gb', ja: 'jp' };
    currentFlag.className = `fi fi-${flags[lang]}`;
  }

  function applyTranslation(lang) {
    const trans = translations[lang];
    if (!trans) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const keys = key.split('.');
      let value = trans;
      for (let k of keys) {
        if (value && value[k] !== undefined) {
          value = value[k];
        } else {
          value = null;
          break;
        }
      }
      if (value) {
        el.textContent = value;
      }
    });
  }

  // ---------- TYPEWRITER ----------
  const textElement = document.getElementById("typeText");
  if (textElement) {
    const wordsMap = {
      es: [
        "Senior Full-Stack Developer",
        "6+ años de experiencia",
        "Especialista en e-commerce",
        "Integraciones HR · APIs",
        "PHP · JavaScript · Node.js",
        "Arquitecturas escalables",
        "Buenos Aires, Argentina"
      ],
      en: [
        "Senior Full-Stack Developer",
        "6+ years of experience",
        "E-commerce specialist",
        "HR integrations · APIs",
        "PHP · JavaScript · Node.js",
        "Scalable architectures",
        "Buenos Aires, Argentina"
      ],
      ja: [
        "シニアフルスタック開発者",
        "6年以上の経験",
        "Eコマース専門家",
        "HR統合 · API",
        "PHP · JavaScript · Node.js",
        "スケーラブルなアーキテクチャ",
        "ブエノスアイレス、アルゼンチン"
      ]
    };

    let currentLang = localStorage.getItem('preferredLang') || 'es';
    let words = wordsMap[currentLang] || wordsMap.es;
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeout;

    function typeWriter() {
      const word = words[wordIndex];
      let speed = deleting ? 40 : 70;

      if (!deleting && charIndex < word.length) {
        textElement.textContent = word.substring(0, charIndex + 1);
        charIndex++;
      } else if (!deleting && charIndex === word.length) {
        deleting = true;
        speed = 1400;
      } else if (deleting && charIndex > 0) {
        textElement.textContent = word.substring(0, charIndex - 1);
        charIndex--;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
      }

      timeout = setTimeout(typeWriter, speed);
    }

    typeWriter();

    window.addEventListener('languageChanged', (e) => {
      const newLang = e.detail.lang;
      if (wordsMap[newLang]) {
        clearTimeout(timeout);
        words = wordsMap[newLang];
        wordIndex = 0;
        charIndex = 0;
        deleting = false;
        typeWriter();
      }
    });
  }

  // ---------- PLAYER ----------
  const container = document.getElementById('playerContainer');
  const expanded = document.getElementById('expandedPlayer');
  const minimized = document.getElementById('minimizedPlayer');
  const hideBtn = document.getElementById('hidePlayerBtn');
  const showBtn = document.getElementById('showPlayerBtn');
  const audio = document.getElementById('audioPlayer');
  const playerButtons = document.querySelectorAll('.player-btn');
  const miniSongName = document.getElementById('miniSongName');
  const miniPlayPause = document.getElementById('miniPlayPause');
  const miniPrev = document.getElementById('miniPrev');
  const miniNext = document.getElementById('miniNext');

  let isDragging = false;
  let offsetX, offsetY;
  let isPlaying = false;

  if (audio) {
    audio.controls = true;

    const tracks = [
      { src: './music.mp3', name: 'breakcore' }
    ];
    let currentTrackIndex = 0;

    function loadTrack(index) {
      if (index < 0) index = tracks.length - 1;
      if (index >= tracks.length) index = 0;
      currentTrackIndex = index;
      audio.src = tracks[index].src;
      if (miniSongName) miniSongName.textContent = tracks[index].name;
      audio.play().catch(() => {});
    }
    loadTrack(0);

    playerButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const src = btn.getAttribute('data-src');
        const name = btn.getAttribute('data-name');
        const trackIndex = tracks.findIndex(t => t.src === src);
        if (trackIndex !== -1) {
          currentTrackIndex = trackIndex;
          loadTrack(currentTrackIndex);
        } else {
          audio.src = src;
          if (miniSongName) miniSongName.textContent = name;
        }
        audio.play();
        isPlaying = true;
        if (miniPlayPause) miniPlayPause.innerHTML = '<i class="fas fa-pause"></i>';
      });
    });

    if (miniPlayPause) {
      miniPlayPause.addEventListener('click', () => {
        if (audio.paused) {
          audio.play();
          miniPlayPause.innerHTML = '<i class="fas fa-pause"></i>';
          isPlaying = true;
        } else {
          audio.pause();
          miniPlayPause.innerHTML = '<i class="fas fa-play"></i>';
          isPlaying = false;
        }
      });
    }

    if (miniPrev) {
      miniPrev.addEventListener('click', () => {
        loadTrack(currentTrackIndex - 1);
        if (isPlaying) audio.play();
      });
    }

    if (miniNext) {
      miniNext.addEventListener('click', () => {
        loadTrack(currentTrackIndex + 1);
        if (isPlaying) audio.play();
      });
    }

    audio.addEventListener('play', () => {
      isPlaying = true;
      if (miniPlayPause) miniPlayPause.innerHTML = '<i class="fas fa-pause"></i>';
    });

    audio.addEventListener('pause', () => {
      isPlaying = false;
      if (miniPlayPause) miniPlayPause.innerHTML = '<i class="fas fa-play"></i>';
    });

    if (hideBtn && showBtn) {
      hideBtn.addEventListener('click', () => {
        expanded.style.display = 'none';
        minimized.style.display = 'block';
      });

      showBtn.addEventListener('click', () => {
        minimized.style.display = 'none';
        expanded.style.display = 'block';
      });
    }

    const dragHandleExpanded = document.getElementById('dragHandle');
    const dragHandleMinimized = document.getElementById('miniDragHandle');

    function startDrag(e) {
      e.preventDefault();
      isDragging = true;
      const rect = container.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      container.style.cursor = 'grabbing';
    }

    function onDrag(e) {
      if (!isDragging) return;
      e.preventDefault();
      let left = e.clientX - offsetX;
      let top = e.clientY - offsetY;
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      left = Math.max(0, Math.min(left, winWidth - containerWidth));
      top = Math.max(0, Math.min(top, winHeight - containerHeight));
      container.style.left = left + 'px';
      container.style.top = top + 'px';
    }

    function stopDrag() {
      isDragging = false;
      container.style.cursor = 'move';
    }

    [dragHandleExpanded, dragHandleMinimized].forEach(handle => {
      if (handle) handle.addEventListener('mousedown', startDrag);
    });

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('mouseup', stopDrag);

    container.style.transform = 'none';
    if (window.innerWidth <= 768) {
      container.style.right = '10px';
      container.style.left = 'auto';
      container.style.top = 'auto';
      container.style.bottom = '90px';
    } else {
      container.style.right = '20px';
      container.style.left = 'auto';
      container.style.top = (window.innerHeight / 2 - container.offsetHeight / 2) + 'px';
    }

    window.addEventListener('resize', () => {
      const rect = container.getBoundingClientRect();
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;
      let left = rect.left;
      let top = rect.top;
      if (left + rect.width > winWidth) left = winWidth - rect.width;
      if (top + rect.height > winHeight) top = winHeight - rect.height;
      left = Math.max(0, left);
      top = Math.max(0, top);
      container.style.left = left + 'px';
      container.style.top = top + 'px';
    });
  }
});

// ================= AVATAR 3D (MONEDA) =================
function initAvatarCoin() {
  const container = document.getElementById('logo3D');
  if (!container) return;

  const oldCanvas = document.getElementById('avatar-canvas');
  if (oldCanvas) oldCanvas.remove();

  const canvas = document.createElement('canvas');
  canvas.id = 'avatar-canvas';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.borderRadius = '50%';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '2';
  container.appendChild(canvas);

  const imgUrl = './perfil-pic.jpg';

  const sceneCoin = new THREE.Scene();
  sceneCoin.background = null;

  const cameraCoin = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  cameraCoin.position.set(0, 0, 3);

  const rendererCoin = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, preserveDrawingBuffer: true });

  const resizeCanvas = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;
    rendererCoin.setSize(width, height, false);
    cameraCoin.aspect = width / height;
    cameraCoin.updateProjectionMatrix();
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Iluminación
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  sceneCoin.add(ambientLight);
  const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
  light1.position.set(1, 1, 2);
  sceneCoin.add(light1);
  const light2 = new THREE.DirectionalLight(0xffffff, 0.5);
  light2.position.set(-1, -0.5, 1);
  sceneCoin.add(light2);

  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    imgUrl,
    (texture) => {
      // Crear un canvas para redimensionar la imagen a un cuadrado
      const img = texture.image;
      const size = Math.max(img.width, img.height);
      const canvasTemp = document.createElement('canvas');
      canvasTemp.width = size;
      canvasTemp.height = size;
      const ctx = canvasTemp.getContext('2d');
      // Dibujar la imagen centrada y escalada para cubrir el cuadrado (efecto cover)
      const scale = size / Math.min(img.width, img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = (size - dw) / 2;
      const dy = (size - dh) / 2;
      ctx.drawImage(img, dx, dy, dw, dh);
      // Crear nueva textura desde el canvas
      const squareTexture = new THREE.CanvasTexture(canvasTemp);
      squareTexture.minFilter = THREE.LinearFilter;
      squareTexture.magFilter = THREE.LinearFilter;
      squareTexture.wrapS = THREE.ClampToEdgeWrapping;
      squareTexture.wrapT = THREE.ClampToEdgeWrapping;

      const coinGroup = new THREE.Group();
      const radius = 1;
      const thickness = 0.1;
      const offset = 0.01;
      const segments = 64;

      const faceMaterial = new THREE.MeshBasicMaterial({
        map: squareTexture,
        side: THREE.FrontSide
      });

      const edgeMaterial = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        emissive: 0x111111,
        roughness: 0.4,
        metalness: 0.7
      });

      const frontGeo = new THREE.CircleGeometry(radius, segments);
      const front = new THREE.Mesh(frontGeo, faceMaterial);
      front.position.z = thickness / 2 + offset;
      coinGroup.add(front);

      const backGeo = new THREE.CircleGeometry(radius, segments);
      const back = new THREE.Mesh(backGeo, faceMaterial);
      back.position.z = -thickness / 2 - offset;
      back.rotation.y = Math.PI;
      coinGroup.add(back);

      const edgeGeo = new THREE.CylinderGeometry(radius, radius, thickness, segments);
      const edge = new THREE.Mesh(edgeGeo, edgeMaterial);
      edge.rotation.x = Math.PI / 2;
      edge.position.z = 0;
      coinGroup.add(edge);

      sceneCoin.add(coinGroup);

      function animateCoin() {
        requestAnimationFrame(animateCoin);
        coinGroup.rotation.y += 0.008;
        rendererCoin.render(sceneCoin, cameraCoin);
      }
      animateCoin();
    },
    undefined,
    (err) => {
      console.error('Error al cargar la textura:', err);
      // Fallback con color sólido
      const coinGroup = new THREE.Group();
      const radius = 1;
      const thickness = 0.1;
      const offset = 0.01;
      const segments = 32;
      const material = new THREE.MeshStandardMaterial({ color: 0x3366cc });

      const front = new THREE.Mesh(new THREE.CircleGeometry(radius, segments), material);
      front.position.z = thickness/2 + offset;
      coinGroup.add(front);

      const back = new THREE.Mesh(new THREE.CircleGeometry(radius, segments), material);
      back.position.z = -thickness/2 - offset;
      back.rotation.y = Math.PI;
      coinGroup.add(back);

      const edge = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, thickness, segments), material);
      edge.rotation.x = Math.PI/2;
      edge.position.z = 0;
      coinGroup.add(edge);

      sceneCoin.add(coinGroup);

      function animateFallback() {
        requestAnimationFrame(animateFallback);
        coinGroup.rotation.y += 0.01;
        rendererCoin.render(sceneCoin, cameraCoin);
      }
      animateFallback();
    }
  );
}

// Iniciar avatar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initAvatarCoin);