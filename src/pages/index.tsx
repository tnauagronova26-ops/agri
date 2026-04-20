import Container from "@/components/Container";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Frame,
  Phone,
  Instagram,
  Mail,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Sparkles,
  Sigma,
  Server,
} from "lucide-react";

const aboutStats = [{ label: "Offline events", value: "13" }, { label: "Online events", value: "3" },{ label: "No of days", value: "2" }];

const onlineEvents = [
  {
    title: "Cine Bytes",
    format: "Short Film",
    description:
      "Lights, camera, agriculture! Showcase your storytelling skills through short films that capture the essence of farming, innovation, and sustainability. From rural realities to agri tech revolutions, bring your vision to life in under 5 minutes.",
  },
  {
    title: "Pixel Saga",
    format: "Photography",
    description:
      "A picture is worth a thousand harvests. Capture the soul of agriculture through your lens – be it golden fields, hardworking hands, modern farm tech, or nature's quiet moments. Let every frame tell a powerful story.",
  },
  {
    title: "Market Masters",
    format: "Advertisement",
    description:
      "Think like a marketer, sell like a pro. Create a compelling ad for an agri product or service that grabs attention and drives impact. Creativity, persuasion, and strategy – may the best brand builder win.",
  },
];

const offlineEvents = [
  {
    title: "Agri Shark Tank",
    description: "",
    },
  {
    title: "Bio-Alchemy",
    description: "",
   },
  {
    title: "Youth Parliament",
    description: "",
   },{
    title: "Waste to Wealth",
    description: "",
   },
  {
    title: "Farm League Arena",
    description: "",
   },
  {
    title: "SopranoX",
    description: "",
    },{
    title: "Bounty Hunt",
    description: "",
   },
  {
    title: "Field Forensics",
    description: "",
    },
  {
    title: "Foodpreneur Feast",
    description: "",
    },
  {
    title: "Abstract cum Presentation",
    description: "",
   },
  {
    title: "Fluents and Fearless",
    description: "",
    },
  {
    title: "Grain Art",
    description: "",
    },
  {
    title: "Workshop",
    description: "",
    },
];

const projectDetails = [
  {
    title: "Nutrigence Bot - AI-Powered Nutrition Assistant",
    description: "Advanced conversational AI system for personalized child and adolescent nutrition guidance",
    fullDescription: "Developed an intelligent nutrition chatbot using RAG (Retrieval-Augmented Generation) architecture with Mistral-7B-Instruct LLM, capable of providing evidence-based dietary recommendations, personalized meal planning, and nutritional guidance based on USDA dietary guidelines with high accuracy. Architecture Highlights: Model: Mistral-7B-Instruct (4-bit quantized),Embedding Model: BAAI/bge-small-en, Vector Store: FAISS with 10 similar document retrieval",
    technologies: ["Python", "Streamlit", "LangChain", "FAISS", "Llama.cpp", "Pandas","HuggingFace"],
    features: [
      "Context-aware nutritional guidance using RAG architecture",
      "Structured dietary recommendations by age, sex, and calorie level",
      "Interactive query system with predefined and custom questions",
      "Multi-category nutrition data:Daily food group targets, Weekly protein subgroup recommendations, Vegetable subgroup intake guidelines, Discretionary calorie limits ",
      "Demographic-based personalization (age, sex, activity level)",
      "Vector similarity search for relevant context retrieval"
    ],
    metrics: [
      { label: "Response Accuracy (based on USDA guidelines)", value: "90%+" },
      { label: "Avg Response Time", value: "<3 seconds" },
      { label: "Data Coverage (kcal range across multiple age groups) ", value: " 1,600-3,200 kcal" }
    ],
    github: "https://github.com/ftkiranraj08/Nutrigence-Bot",
    live: "#",
    category: "RAG/AI"
  },
  {
    title: "Real-Time Tweet Sentiment Pipeline",
    description: "End-to-end streaming sentiment analysis system for social media using Spark, Delta Lake, and Transformers",
    fullDescription: "Built a production-scale real-time sentiment analysis pipeline for Twitter data using Spark Structured Streaming and a medallion architecture in Delta Lake. Integrated a Hugging Face transformer model via MLflow to classify tweet sentiment with high accuracy, enabling live dashboards and aggregated insights.",
    technologies: ["PySpark", "Delta Lake", "Hugging Face", "MLflow", "Python", "Databricks"],
    features: [
      "Spark Streaming with Delta Lake medallion architecture",
      "Real-time sentiment scoring using transformer models",
      "Automated data cleaning and mention extraction",
      "MLflow-integrated model serving and UDF deployment",
      "Live monitoring with throughput and latency tracking"
    ],
    metrics: [
      { label: "Pipeline Latency", value: "< 2 seconds" },
      { label: "Model Inference Throughput", value: "1K+ tweets/sec" },
      { label: "Daily Processed Tweets", value: "5M+" }
    ],
    github: "https://github.com/ftkiranraj08/Data-Science-at-Scale-Final-Project",
    live: "#",
    category: "Real Time NLP & Streaming Analytics"
  },
  {
    title: "Hierarchical Bayesian Media Mix Modeling",
    description: "Geo-aware marketing optimization system for regional advertising effectiveness",
    fullDescription: "Developed a hierarchical Bayesian Media Mix Model to quantify the causal impact of advertising spend across 169 Designated Market Areas (DMAs). The model integrates nonlinear media transformations (adstock, saturation) with contextual clustering and partial pooling, enabling stable, region-specific ROI estimates and data-driven budget allocation.",
    technologies: ["PyMC", "JAX", "Python", "Pandas", "Scikit-learn", "LightweightMMM","Matplotlib","arviz"],
    features: [
      "Hierarchical Bayesian modeling with partial pooling across 169 DMAs",
      "Nonlinear media response modeling (adstock & saturation effects)",
      "Contextual clustering using demographic and socioeconomic features",
      "Full probabilistic uncertainty quantification for all estimatess",
      "Data-driven budget allocation recommendations",
      "Scalable inference using PyMC with JAX acceleration"
    ],
    metrics: [
      { label: "Out-of-Sample R²", value: "0.77" },
      { label: "DMA-Level ROI Precision", value: "+35% vs. baseline" },
      { label: "Markets Modeled", value: "169 DMAs" }
    ],
    github: "#",
    live: "#",
    category: "Marketing Analytics"
  },
  {
    title: "Multilingual Translator with Sentiment & Summarization",
    description: "Real-time speech-to-text translator with emotional tone analysis and text summarization",
    fullDescription: "Developed a multi-functional NLP pipeline that translates spoken or written text between languages (Hindi, English, Tamil) in real-time, performs sentiment analysis to detect emotional tone, and summarizes long documents using the RoBERTa model. The system integrates speech recognition, Google Translate API, and transformer models for end-to-end multilingual communication.",
    technologies: ["Python", "RoBERTa", "Transformers", "NLTK", "SpeechRecognition", "Google Translate API", "PyTorch"],
    features: [
      "Real-time speech-to-text translation with sentiment analysis (positive/negative/neutral)",
      "Text summarization using RoBERTa model for English documents",
      "Multilingual support for English, Hindi, and Tamil",
      "Integration of Google Translate API for improved contextual accuracy",
      "End-to-end NLP pipeline from audio input to summarized/translated output"
    ],
    metrics: [
      { label: "Translation Speed", value: "<300 ms" },
      { label: "Supported Languages", value: " 3+" },
      { label: "Summarization Accuracy", value: "Contextually coherent" }
    ],
    github: "#",
    live: "#",
    category: "Natural Language Processing"
  },
  {
    title: "Playlist Optimization & Recommendation Analysis",
    description: "Statistical & non-parametric exploration of track popularity, genre diversity, and playlist structure.",
    fullDescription: "Conducted an in-depth analysis of the Spotify Million Playlist Dataset (MPD) to uncover the key factors influencing playlist engagement and user preferences. Applied statistical tests, clustering, and visualization techniques to identify patterns in genre distribution, track repetition, and sequence logic, providing actionable insights to enhance music recommendation systems.",
    technologies: ["Python", "Pandas", "NumPy", "SciPy", "Scikit-learn", "Matplotlib", "Seaborn", "Plotly"],
    features: [
      "Statistical and non-parametric analysis of 1M+ Spotify playlists",
      "Genre diversity and track popularity trend identification",
      "Clustering and collaborative filtering for recommendation insights",
      "Interactive visualizations of playlist structure and user behavior",
      "Data-driven strategies to improve playlist curation and engagement"
    ],
    metrics: [
      { label: "Playlists Analyzed", value: " 1,000,000+" },
      { label: "Genres Identified", value: "2,000+" },
      { label: "Recommendation Model Precision", value: "Improved by data insights" }
    ],
    github: "https://github.com/ftkiranraj08/Playlist-Recommender",
    live: "#",
    category: "Product & Engagement Analytics"
  },
  {
    title: "Spatiotemporal Network Analysis of Urban Mobility",
    description: "Modeling NYC taxi & ride-hailing dynamics using graph theory and econometrics",
    fullDescription: "Applied network science to model and analyze NYC's taxi and for-hire vehicle (FHV) networks using a decade of trip data. Constructed spatiotemporal graphs, computed centrality metrics (PageRank, Betweenness), and performed panel regressions to uncover relationships between structural zone importance and fare economics, offering data-driven insights for congestion pricing and fleet optimization.",
    technologies: ["Python", "Pandas", "NetworkX", "Statsmodels", "Dash", "GeoPandas", "SciPy", "Plotly"],
    features: [
      "Spatiotemporal network modeling of 3+ billion NYC taxi/FHV trips",
      "Centrality analysis using PageRank, Betweenness, and degree measures",
      "Panel regression linking network structure to fare economics",
      "Interactive dashboard for real-time network visualization",
      "Policy insights for congestion pricing and equitable fleet allocation"
    ],
    metrics: [
      { label: "Trips Analyzed", value: " 3 Billion+" },
      { label: "Zones Modeled", value: "263+" },
      { label: "Model R² Up to", value: "0.24" }
    ],
    github: "https://github.com/ftkiranraj08/Analyzing-NYC-Taxi-and-Ride-Hailing-Dynamics/tree/main",
    live: "#",
    category: "Network Science & Econometric Analysis"
  },
  {
    title: "Data-Driven Market Potential & Customer Engagement Strategy",
    description: "Advanced data mining and clustering of U.S. supermarket data to uncover sales and profit potential",
    fullDescription: "Conducted a comprehensive data mining analysis on merged supermarket and population datasets to identify high-potential U.S. states for business expansion. Applied clustering, classification, and information gain techniques to evaluate sales per capita, profit per capita, and product diversity, providing actionable insights for targeted marketing and investment decisions.",
    technologies: ["Python", "Pandas", "Scikit-learn", "PCA", "K-Means", "Matplotlib", "Seaborn"],
    features: [
      "Multi-metric state ranking based on sales and profit per capita",
      "K-Means clustering to identify high-potential market segments",
      "Information gain analysis to determine key profitability drivers",
      "Classification framework for high/moderate/low potential states",
      "Diversity analysis to recommend broad vs. niche retail strategies"
    ],
    metrics: [
      { label: "States Classified", value: " 48" },
      { label: "Profit Correlation Score", value: "0.83" },
      { label: "High-Potential Markets Identified", value: "6" }
    ],
    github: "https://github.com/ftkiranraj08/Mapping-market-dynamics",
    live: "#",
    category: "Market & Customer Analytics"
  },
  {
    title: "COVID-19 Case Prediction with Social Media Awareness Signals",
    description: "Machine learning framework integrating Twitter trends to forecast county-level infections in Ohio",
    fullDescription: "Developed an ensemble ML pipeline to predict COVID-19 cases across Ohio counties by combining epidemiological data with Twitter-derived social awareness metrics. Engineered features from normalized similarity scores (Jaccard, Cosine, Intersection) and applied stacking of XGBoost, Random Forest, LightGBM, and CatBoost models, achieving high predictive accuracy and offering actionable insights for public health communication.",
    technologies: ["Python", "XGBoost", "Random Forest", "LightGBM", "CatBoost", "Scikit-learn", "Pandas","t-SNE"],
    features: [
      "Integration of Twitter awareness metrics with traditional epidemiological data",
      "Advanced feature engineering including cyclical encoding and interaction terms",
      "Stacking ensemble model combining four high-performance regressors",
      "Dimensionality reduction and clustering for demographic & awareness features",
      "High R² score demonstrating strong predictive power for public health planning"
    ],
    metrics: [
      { label: "Prediction Accuracy R² ", value: " 0.8636" },
      { label: "Counties Analyzed", value: "Ohio (Statewide)" },
      { label: "Features Engineered", value: "144+" }
    ],
    github: "#",
    live: "#",
    category: "Time Series & Predictive Modeling"
  },
  {
    title: "Airline Ticket Fare Forecasting with Temporal & Demand Signals",
    description: "Machine learning framework for predicting flight ticket prices using historical, temporal, and route-level features",
    fullDescription: "Developed an end-to-end machine learning pipeline to forecast airline ticket fares by integrating historical pricing data with temporal, route, and demand-related features. Engineered advanced features including cyclical time encodings, lag variables, rolling statistics, and interaction terms. Applied ensemble learning using Gradient Boosting–based and tree-based regressors to capture complex non-linear pricing patterns, achieving strong predictive performance and practical insights for travel planning and pricing strategy.",
    technologies: ["Python", "XGBoost", "Random Forest", "LightGBM", "CatBoost", "Scikit-learn", "Pandas","matplotlib","numpy"],
    features: [
      "Airline fare prediction using historical, temporal, and route-specific signals",
      "Advanced feature engineering with lag features, rolling averages, and cyclical encoding",
      "Stacking ensemble model combining multiple high-performance regressors",
      "Time-aware train–validation strategy to prevent data leakage",
      "Robust regression performance suitable for pricing intelligence and demand forecasting"
    ],
    metrics: [
      { label: "Prediction Accuracy R² ", value: " 0.8476" },
      { label: "Routes Analyzed", value: "Multi-city / Domestic Flights" },
      { label: "Features Engineered", value: "120+" }
    ],
    github: "https://github.com/ftkiranraj08/Airline-Ticket-Fare-Forecasting/tree/main",
    live: "#",
    category: "Time Series and Pricing Analytics"
  },
];

const services = [
  {
    service: "AI & Machine Learning",
    description:
      "Designing and deploying end-to-end machine learning and deep learning systems, including NLP, computer vision, and predictive modeling for real-world applications.",
    icon: Code2,
  },
  {
    service: "Generative AI & RAG Systems",
    description:
      "Building Retrieval-Augmented Generation (RAG) pipelines using LangChain, FAISS, and large language models to enable accurate, explainable, and scalable AI applications.",
    icon: Sparkles,
    
  },
  {
    service: "Data Science & Analytics",
    description:
      "Transforming complex datasets into actionable insights using statistical modeling, clustering, experimentation, and business-driven analytics.",
    icon: Frame,
  },
  {
    service: "Data Engineering & MLOps",
    description:
            "Engineering scalable data pipelines, model deployment workflows, and monitoring systems using cloud platforms, Docker, and modern MLOps practices.",
    icon: Server,
  },
  {
    service: "Bayesian & Statistical Modeling",
    description:
      "Applying Bayesian hierarchical models, time-series forecasting, and causal inference techniques to quantify uncertainty and optimize strategic decisions.",
    icon: Sigma,
  },

];

// Teaching Experience Data
const teachingExperience = [
  {
    type: "Teaching Assistantship",
    position: "Graduate Teaching Assistant",
    institution: "University of Rochester - Simon Business School",
    duration: "Jan 2025 - May 2025",
    location: "Rochester, New York",
    courses: [
      {
        code: "CIS431",
        name: "Big Data",
        duration: "Mar 2025 - May 2025 · 3 mos",
        topics: [
          "Big Data Fundamentals: Introduction to Big Data concepts and architecture overview",
          "HDFS & MapReduce: Distributed storage with HDFS and the MapReduce programming model",
          "Apache Hive: Querying data with HiveQL, data management in Hive, relational analysis & complex data types, and text-analysis workflows",
          "Apache Spark: Core Spark architecture, data inspection, transformations & actions, and combining & grouping large datasets",
          "Spark MLlib: Machine-learning fundamentals in Spark MLlib, feature extraction & building regression models, classification models & hyperparameter tuning, and cluster models & end-to-end ML pipelines",
          "Streaming Data Analysis: Introduction to real-time data processing with Spark Streaming"
        ]
      },
      {
        code: "GBA468",
        name: "Prescriptive Analytics with Python",
        duration: "Jan 2025 - Mar 2025 · 3 mos",
        topics: [
          "Optimization Models: Linear Programming (LP), Integer LP, Non-Linear Programming (NLP), Multi-Objective Optimization (MOO), and Network Optimization",
          "Decision Analysis: Decision rules under risk & uncertainty, Expected Utility Theory, Decision Trees, and Single/Multistage Decision Models",
          "Simulation Modeling: Monte Carlo Simulation, Capacity Management, and Python-based simulation modeling"
        ]
      }
    ],
    responsibilities: [
      "Assisted instructors with course delivery for Big Data and Prescriptive Analytics courses serving 100+ graduate students",
      "Conducted office hours and provided one-on-one support for students on complex topics including Spark MLlib, optimization models, and simulation",
      "Graded assignments, projects, and exams ensuring timely feedback and maintaining academic standards",
      "Facilitated hands-on lab sessions covering Apache Spark, Hive, MapReduce, and Python-based optimization frameworks",
      "Helped students debug code, troubleshoot distributed computing environments, and understand machine learning pipelines",
      "Developed supplementary materials and examples to clarify challenging concepts in streaming data analysis and decision trees"
    ],
    technologies: ["Apache Spark", "Hadoop", "HDFS", "MapReduce", "Apache Hive", "Spark MLlib", "Python", "PySpark", "Optimization Algorithms", "Monte Carlo Simulation"],
    impact: "Supported graduate student learning in advanced data engineering and prescriptive analytics, contributing to strong course evaluations"
  }
];

// Research Experience Data
const researchExperience = [
  {
    position: "Research Assistant",
    institution: "University of Rochester Medical Center / Dr. Dong Mei Li's Lab",
    duration: "Aug 2024 - Dec 2025",
    location: "Rochester, NY",
    description: "Conducted interdisciplinary public health research combining statistical modeling, machine learning, and multimodal social media analysis to study the effects of smoking, vaping, and comorbidities on COVID-19 severity and tobacco use behaviors.",
    responsibilities: [
      "Conducted advanced statistical analysis on de-identified N3C Level 2 clinical data to examine moderation effects of smoking and vaping on the relationship between comorbidities and COVID-19 outcomes including hospitalization, ICU admission, and mortality",
      "Developed and implemented Structural Equation Modeling (SEM) and Stochastic Latent Effect Modeling (SLEM) in MPlus to analyze mediation and causal pathways linking smoking, comorbidities, and COVID-19 severity",
      "Performed cross-tabulations and demographic stratified analyses to study interactions between smoking status, HIV status, comorbidities, and COVID-19 outcomes, identifying key health disparity patterns",
      "Built statistical models and generated publication-quality visualizations to support findings on inequities in smoking/vaping behaviors and COVID-19 severity across demographic groups",
      "Leveraged TikTok Research API to collect and preprocess large-scale vaping-related video data, extracting speech and on-screen text using OpenAI Whisper for speech-to-text and EasyOCR for text recognition",
      "Implemented Video LLaMA for multimodal classification of TikTok content into pro-vaping and anti-vaping categories, contributing behavioral insights for public health communication strategies",
      "Analyzed PATH Wave 7 Adult Survey data (30,000+ respondents, 1,900+ variables) to model tobacco use patterns across non-users, single-product users, and multi-product users",
      "Engineered a comprehensive feature set across 10 behavioral domains and performed systematic feature selection, multicollinearity reduction (VIF < 5), and dimensionality control to improve model interpretability",
      "Addressed severe class imbalance using SMOTE and class-weighted learning, developing ensemble classifiers combining XGBoost, LightGBM, and CatBoost with soft voting",
      "Conducted rigorous evaluation using stratified cross-validation, AUC/AUPRC analysis, confusion matrices, and benchmarking against prior models to validate robustness and generalizability",
      "Collaborated with multidisciplinary research teams and presented findings in lab meetings and research seminars"
                    ],
    technologies: [
      "Python", "Pandas", "NumPy", "Scikit-learn", "XGBoost", "LightGBM", "CatBoost",
      "imbalanced-learn", "SciPy", "MPlus", "Matplotlib", "OpenAI Whisper",
      "EasyOCR", "Video LLaMA"
                ],
    publications: [
      "Manuscript under preparation on smoking/vaping moderation effects in COVID-19 severity (Target: Public Health / Epidemiology Journal)"
      ],
    impact: "Produced data-driven insights on tobacco use, COVID-19 severity, and health disparities."
  },
  {
    position: "Graduate Research Assistant / Software Developer",
    institution: "University of Rochester / Dr. Allison J Lopatkin's Lab",
    duration: "Jan 2025 - Dec 2025",
    location: "Rochester, NY",
    description: "Developed a full-stack web application for designing and simulating genetic circuits with hardware integration for physical EEPROM-based component storage and automated DNA circuit modeling.",
    responsibilities: [
      "Built Flask-based backend with ODE solver for genetic circuit simulation using Hill kinetics",
      "Implemented drag-and-drop interface with jsPlumb for visual circuit design (1000+ lines frontend code)",
      "Developed bidirectional hardware integration for EEPROM multiplexer boards (32 channels, MUX A/B)",
      "Created automated circuit ontology builder parsing regulatory relationships and component interactions",
      "Engineered real-time parameter tuning system with dial controls for promoter/RBS strength adjustment",
      "Implemented circuit-to-hardware mapping system converting visual designs to physical board layouts",
      "Built comprehensive logging and debugging system for EEPROM read/write operations",
      "Developed LaTeX equation rendering for dynamical system visualization"
    ],
    technologies: [ "Python",
    "Flask",
    "NumPy",
    "SciPy",
    "Matplotlib",
    "JavaScript",
    "jQuery",
    "jsPlumb",
    "Bootstrap 5",
    "HTML5/CSS3",
    "Serial Communication",
    "ODE Solvers" ],
    publications: ["MAGiC: A Modular Genetic Circuit Design Platform (AIChE Annual Student Conference, 2025)"],
    impact: "Submitted for patent protection through UR Ventures."
  }
];

export default function Home() {
  const refScrollContainer = useRef<HTMLDivElement | null>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let locomotiveInstance: { destroy: () => void; scroll?: { scrollTo: (target: HTMLElement | null, options?: any) => void } } | null = null;

    async function getLocomotive() {
      if (!refScrollContainer.current) return;

      const Locomotive = (await import("locomotive-scroll")).default;
      locomotiveInstance = new Locomotive({
        el: refScrollContainer.current,
        smooth: true,
      });

      // Handle hash navigation with Locomotive Scroll
      const handleHashNavigation = (e: Event) => {
        const target = e.target as HTMLAnchorElement;
        if (target.tagName === "A" && target.hash) {
          e.preventDefault();
          const id = target.hash.substring(1);
          const element = document.getElementById(id);
          if (element && locomotiveInstance?.scroll) {
            locomotiveInstance.scroll.scrollTo(element);
          }
        }
      };

      refScrollContainer.current?.addEventListener("click", handleHashNavigation);

      return () => {
        refScrollContainer.current?.removeEventListener("click", handleHashNavigation);
      };
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 150) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      locomotiveInstance?.destroy();
    };
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="min-h-screen flex w-full flex-col items-center justify-center"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-center flex-1">
            <div className="overflow-hidden bg-blue-600/20 py-3 border-b border-white/10 absolute top-20 left-20 right-20 rounded-lg">
              <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(2)].map((_, i) => (
                  <span key={i} className="shrink-0 flex items-center gap-8 px-8">
                    {["Registration starts on 21/04/2026", "Last date for registration 12/05/2026"].map((text, j) => (
                      <span key={j} className="text-black flex items-center gap-8 text-sm font-medium tracking-widest uppercase">
                        {text}
                        <span className="text-black mx-2">✦</span>
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>
            <div
              data-scroll
              data-scroll-speed="-.01"
              className="relative mx-auto w-full aspect-[4/3] md:aspect-[16/9]"
            >
              <Image
                src="/assets/WhatsApp Image 2026-04-17 at 9,50,22 PM-Picsart-AiImageEnhancer-Picsart-BackgroundRemover.jpeg"
                alt="Agronova 26 emblem"
                fill
                priority
                sizes="100vw"
                className="object-contain p-2"
              />
            </div>
            <span className="-mt-16 md:-mt-48 flex flex-row items-center justify-center space-x-2 relative z-30">
              <Link href="#registration">
                <Button>
                  Register <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
                <Button
                  variant="outline"
                >
                  <a href="/brochure.pdf" download className="w-full">Brochure</a>                
                </Button>          
            </span>
          </div>
         
        </section>

        {/* About */}
        <section id="about" data-scroll-section className="pt-24">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex max-w-6xl flex-col justify-start space-y-16"
          >
            <div className="space-y-12">
              <h2 className="text-justify text-2xl font-light leading-relaxed tracking-tight text-foreground xl:text-[36px] xl:leading-[1.5]">
               Agronova is a scientific event warmly welcomes the future enthusiasts of the Indian nation. This prestigious occasion offers each participant a level playing field to showcase their hidden talents. Agronova’26 cordially invites all inquisitive and passionate minds to delve into India’s agricultural backbone. Don’t miss out on this valuable opportunity—join us and showcase your talents to hit our targets.
              </h2>
              
              <div className="grid grid-cols-2 gap-6 pt-4 xl:grid-cols-3 xl:gap-8">
                {aboutStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="group relative flex flex-col space-y-2 rounded-lg border border-primary/60 bg-primary p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/100 hover:shadow-[0_0_30px_rgba(131,177,36,0.4)] hover:-translate-y-1"
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-lg border border-primary/0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]" />
                    <span className="clash-grotesk relative text-white text-5xl font-bold tracking-tight xl:text-6xl">
                      {stat.value}
                    </span>
                    <span className="relative text-sm leading-snug tracking-tight text-white/80 xl:text-base group-hover:text-white transition-colors">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Events Online */}
        <section id="events-online" data-scroll-section className="my-40">
          <div data-scroll data-scroll-speed=".4" data-scroll-position="top">
            <h2 className=" clash-grotesk mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
              Online Events
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {onlineEvents.map((event) => (
                <div
                  key={event.title}
                  className="group relative rounded-xl border border-primary/60 bg-primary p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/100 hover:shadow-[0_0_30px_rgba(131,177,36,0.4)] hover:-translate-y-2 overflow-hidden"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-xl border border-primary/0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]" />
                  <div className="pointer-events-none absolute -inset-px opacity-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent transition-opacity duration-300 group-hover:opacity-100" />
                  <h3 className="relative text-xl font-semibold tracking-tight text-white group-hover:text-white/95 transition-colors">
                    {event.title}
                  </h3>
                  {event.description && (
                    <p className="relative mt-2 text-sm leading-relaxed text-white/80 group-hover:text-white/90 transition-colors">
                      {event.description}
                    </p>
                  )}
                  <Button
                    className="relative mt-4 bg-white text-primary hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    onClick={() => scrollTo(document.querySelector("#registration"))}
                  >
                    Get more info
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Events Offline */}
        <section id="events-offline" data-scroll-section className="my-40">
          <div data-scroll data-scroll-speed=".4" data-scroll-position="top">
            <h2 className=" clash-grotesk mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
              Offline Events
            </h2>
          
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {offlineEvents.map((event) => (
                <div
                  key={event.title}
                  className="group relative rounded-xl border border-primary/60 bg-primary p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/100 hover:shadow-[0_0_30px_rgba(131,177,36,0.4)] hover:-translate-y-2 overflow-hidden"
                >
                  <div className="pointer-events-none absolute inset-0 rounded-xl border border-primary/0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]" />
                  <div className="pointer-events-none absolute -inset-px opacity-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent transition-opacity duration-300 group-hover:opacity-100" />
                  <h3 className="relative text-xl font-semibold tracking-tight text-white group-hover:text-white/95 transition-colors">
                    {event.title}
                  </h3>
                  {event.description && (
                    <p className="relative mt-2 text-sm leading-relaxed text-white/80 group-hover:text-white/90 transition-colors">
                      {event.description}
                    </p>
                  )}
                  <Button
                    className="relative mt-4 bg-white text-primary hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    onClick={() => scrollTo(document.querySelector("#registration"))}
                  >
                    Get more info
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Instructions */}
        <section id="registration" data-scroll-section className="my-40">
          <div data-scroll data-scroll-speed=".4" data-scroll-position="top">
             <h2 className=" clash-grotesk mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
              Registration
            </h2>
            <div className="relative mt-10 grid gap-8 rounded-xl border border-primary/60 bg-primary p-8 backdrop-blur-sm lg:grid-cols-2 lg:items-center overflow-hidden transition-all duration-300 hover:border-primary/100 hover:shadow-[0_0_30px_rgba(131,177,36,0.4)] group">
              <div className="pointer-events-none absolute inset-0 rounded-xl border border-primary/0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]" />
              <div className="pointer-events-none absolute -inset-px opacity-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <h3 className="text-2xl font-semibold text-white mb-6">For further information</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Phone className="h-6 w-6 flex-shrink-0 mt-0.5 text-white" />
                    <div>
                      <p className="font-semibold text-white text-lg">Mr. Semmozhimaran V</p>
                      <p className="text-sm text-white/80">+91 81226 10586</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <Phone className="h-6 w-6 flex-shrink-0 mt-0.5 text-white" />
                    <div>
                      <p className="font-semibold text-white text-lg">Ms. Gayathri T</p>
                      <p className="text-sm text-white/80">+91 87543 05340</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="https://docs.google.com/forms/d/e/1FAIpQLScpXTBfo6BdOPQQeIxUltaEd3lK8GVRn2u0TeE-ndct5vDMUg/viewform?usp=preview" passHref>
                    <Button className="relative bg-white text-primary hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                      Complete Registration <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative flex items-center justify-center lg:justify-end">
                <div className="rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md p-4 shadow-2xl group/image hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300">
                  <div className="relative overflow-hidden rounded-xl bg-white shadow-lg">
                    <img
                      src="/assets/PHOTO-2026-04-19-15-28-11.jpg"
                      alt="Agronova coordinators"
                      className="h-full w-full rounded-md object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-3 text-center text-xs font-medium uppercase tracking-[0.14em] text-foreground/80">
                    Scan to Register
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <h2 className="clash-grotesk mt-3 text-4xl font-semibold tracking-tight xl:text-6xl mb-6 text-foreground text-center">
            Contact Info
          </h2>

          <div
            className="mx-auto flex flex-col items-center justify-center rounded-lg border border-primary/60 bg-primary px-6 py-8 text-center xl:py-12 max-w-2xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
              {/* Phone Card 1 */}
              <a
                href="tel:+918248961330"
                className="text-primary hover:text-primary"
              >
                <div className="group relative rounded-xl border border-primary/20 bg-white p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/100 hover:shadow-[0_0_30px_rgba(131,177,36,0.3)] hover:-translate-y-2 overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 rounded-xl border border-primary/0 shadow-[inset_0_1px_0_0_rgba(131,177,36,0.1)] transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[inset_0_1px_0_0_rgba(131,177,36,0.2)]" />
                  <div className="pointer-events-none absolute -inset-px opacity-0 rounded-xl bg-gradient-to-br from-primary/10 to-transparent transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-center gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0" />
                    <span className="font-semibold text-sm">+91 82489 61330</span>
                  </div>
                </div>
              </a>

              {/* Phone Card 2 */}
              <a
                href="tel:+918220915749"
                className="text-primary hover:text-primary"
              >
                <div className="group relative rounded-xl border border-primary/20 bg-white p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/100 hover:shadow-[0_0_30px_rgba(131,177,36,0.3)] hover:-translate-y-2 overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 rounded-xl border border-primary/0 shadow-[inset_0_1px_0_0_rgba(131,177,36,0.1)] transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[inset_0_1px_0_0_rgba(131,177,36,0.2)]" />
                  <div className="pointer-events-none absolute -inset-px opacity-0 rounded-xl bg-gradient-to-br from-primary/10 to-transparent transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-center gap-3">
                    <Phone className="h-5 w-5 flex-shrink-0" />
                    <span className="font-semibold text-sm">+91 82209 15749</span>
                  </div>
                </div>
              </a>

              {/* Instagram Card */}
              <a
                href="https://instagram.com/agronova.2026"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary"
              >
                <div className="group relative rounded-xl border border-primary/20 bg-white p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/100 hover:shadow-[0_0_30px_rgba(131,177,36,0.3)] hover:-translate-y-2 overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 rounded-xl border border-primary/0 shadow-[inset_0_1px_0_0_rgba(131,177,36,0.1)] transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[inset_0_1px_0_0_rgba(131,177,36,0.2)]" />
                  <div className="pointer-events-none absolute -inset-px opacity-0 rounded-xl bg-gradient-to-br from-primary/10 to-transparent transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-center gap-3">
                    <Instagram className="h-5 w-5 flex-shrink-0" />
                    <span className="font-semibold text-sm">@agronova.2026</span>
                  </div>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:tnau.agronova26@gmail.com"
                className="text-primary hover:text-primary"
              >
                <div className="group relative rounded-xl border border-primary/20 bg-white p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/100 hover:shadow-[0_0_30px_rgba(131,177,36,0.3)] hover:-translate-y-2 overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 rounded-xl border border-primary/0 shadow-[inset_0_1px_0_0_rgba(131,177,36,0.1)] transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[inset_0_1px_0_0_rgba(131,177,36,0.2)]" />
                  <div className="pointer-events-none absolute -inset-px opacity-0 rounded-xl bg-gradient-to-br from-primary/10 to-transparent transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-center gap-3">
                    <Mail className="h-5 w-5 flex-shrink-0" />
                    <span className="font-semibold text-sm">tnau.agronova26@gmail.com</span>
                  </div>
                </div>
              </a>
            </div>

            {/* Brochure Button
            <div className="mt-8 w-full max-w-2xl">
              <a href="/308065124_464535789048420_7533850199481911634_n.jpg" download className="w-full">
                <Button className="relative w-full bg-white text-primary hover:bg-white/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                  <span>Download Brochure</span>
                </Button>
              </a>
            </div> */}
          </div>
        </section>
      </div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#22c774" />
              <stop offset={1} stopColor="#d9ffeb" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0ea765" />
              <stop offset={1} stopColor="#7ff0c3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
