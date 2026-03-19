const translations = {
  es: {
    nav: {
      logo: "Franco Lisi",
      home: "Inicio",
      about: "Sobre mí",
      stack: "Stack",
      experience: "Experiencia",
      gamedev: "Videojuegos",
      extra: "+ Experiencias",
      projects_web: "Proyectos Web",
      projects_gamedev: "Proyectos GameDev",
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
      gamedev: "Game Dev",
      extra: "+ Experiences",
      projects_web: "Web Projects",
      projects_gamedev: "GameDev Projects",
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
      gamedev: "ゲーム開発",
      extra: "+ 経験",
      projects_web: "ウェブプロジェクト",
      projects_gamedev: "ゲームプロジェクト",
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