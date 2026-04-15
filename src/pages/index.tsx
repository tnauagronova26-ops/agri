import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Frame,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Sparkles,
  Sigma,
  Server,
} from "lucide-react";

const aboutStats = [{ label: "Offline events", value: "13+" }, { label: "Online events", value: "3+" }, { label: "Prize pool", value: "30k+" }, { label: "No of days", value: "2" }];

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
    title: "Innovation Expo",
    format: "On-campus Showcase",
    description:
      "Experience live demos of robotics, IoT devices, and smart irrigation systems built for resilient agriculture.",
  },
  {
    title: "Field Diagnostics Challenge",
    format: "Team Competition",
    description:
      "Solve real farm scenarios involving soil health, pest control, and yield optimization with data-backed reasoning.",
  },
  {
    title: "Industry Connect Meet",
    format: "Networking Session",
    description:
      "Engage directly with researchers, startups, and agribusiness leaders for collaboration and career opportunities.",
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

    let locomotiveInstance: { destroy: () => void } | null = null;

    async function getLocomotive() {
      if (!refScrollContainer.current) return;

      const Locomotive = (await import("locomotive-scroll")).default;
      locomotiveInstance = new Locomotive({
        el: refScrollContainer.current,
        smooth: true,
      });
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
          className="mt-24 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:justify-center"
        >
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-12">
            <div className="flex w-full flex-col items-center text-center xl:items-start xl:text-left">
              <div
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="flex items-center justify-center xl:justify-start"
              >
                <h1 className="clash-grotesk text-gradient text-center text-4xl font-semibold tracking-tight sm:text-6xl xl:text-left xl:text-7xl 2xl:text-8xl">
                  AGRONOVA&apos;26
                </h1>
              </div>

              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-5 max-w-2xl text-base leading-relaxed tracking-tight text-muted-foreground sm:text-lg 2xl:text-xl"
              >
               Securing soil sense. <i>"Reclaiminng the reselience of the roots."</i> </p>

              <span
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-8 flex flex-row items-center space-x-2"
              >
                <Link href="mailto:tnau.agronova26@gmail.com" passHref>
                  <Button>
                    Register <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => scrollTo(document.querySelector("#about"))}
                >
                  Learn more
                </Button>
              </span>
            </div>

            <div
              data-scroll
              data-scroll-speed="-.01"
              id={styles["canvas-container"]}
              className="mx-auto w-full max-w-[760px] justify-self-center xl:mx-0 xl:justify-self-end"
            >
              <Suspense fallback={<span>Loading...</span>}>
                <Spline scene="https://prod.spline.design/D7akjVjTOXrg4HQr/scene.splinecode" />
              </Suspense>
            </div>
          </div>
          <div
            className={cn(
              styles.scroll,
              isScrolled && styles["scroll--hidden"],
            )}
          >
            Scroll to discover{" "}
            <TriangleDownIcon className="mt-1 animate-bounce" />
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
               AGRONOVA’26 is Tamil Nadu’s premier agri tech symposium, bringing together the brightest minds in agriculture, technology, and sustainability. Organized annually by Tamil Nadu Agricultural University (TNAU), it serves as a dynamic platform for students, researchers, entrepreneurs, and farmers to explore cutting edge innovations, present transformative ideas, and collaborate on solutions for the future of farming.

The 2026 edition focuses on emerging agri technologies, climate resilient practices, and digital agriculture, empowering the next generation of agri leaders to drive real world impact.
              </h2>
              
              <div className="grid grid-cols-2 gap-6 pt-4 xl:grid-cols-4 xl:gap-8">
                {aboutStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col space-y-2 rounded-lg border border-border/40 bg-secondary/20 p-6 backdrop-blur-sm transition-all hover:border-border/60 hover:bg-secondary/30"
                  >
                    <span className="clash-grotesk text-gradient text-5xl font-bold tracking-tight xl:text-6xl">
                      {stat.value}
                    </span>
                    <span className="text-sm leading-snug tracking-tight text-muted-foreground xl:text-base">
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
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              Online Events
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
              Learn and build from anywhere.
            </h2>
            <p className="mt-1.5 max-w-3xl text-base tracking-tight text-muted-foreground xl:text-lg">
              Interactive virtual sessions designed to connect students, researchers, and builders through applied agri-tech experiences.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {onlineEvents.map((event) => (
                <div
                  key={event.title}
                  className="rounded-xl border border-border/40 bg-secondary/20 p-6 backdrop-blur-sm transition-all hover:border-border/60 hover:bg-secondary/30"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {event.format}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => scrollTo(document.querySelector("#registration"))}
                  >
                    Register
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Events Offline */}
        <section id="events-offline" data-scroll-section className="my-40">
          <div data-scroll data-scroll-speed=".4" data-scroll-position="top">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              Offline Events
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
              Experience innovation on ground.
            </h2>
            <p className="mt-1.5 max-w-3xl text-base tracking-tight text-muted-foreground xl:text-lg">
              High-energy in-person tracks at TNAU where ideas, experiments, and collaborations move from concept to action.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {offlineEvents.map((event) => (
                <div
                  key={event.title}
                  className="rounded-xl border border-border/40 bg-secondary/20 p-6 backdrop-blur-sm transition-all hover:border-border/60 hover:bg-secondary/30"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {event.format}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => scrollTo(document.querySelector("#registration"))}
                  >
                    Register
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Registration Instructions */}
        <section id="registration" data-scroll-section className="my-40">
          <div data-scroll data-scroll-speed=".4" data-scroll-position="top">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              Registration
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight xl:text-6xl">
              General Instructions
            </h2>
            <p className="mt-1.5 max-w-3xl text-base tracking-tight text-muted-foreground xl:text-lg">
              Please review the instructions carefully before submitting your registration.
            </p>

            <div className="mt-10 grid gap-8 rounded-xl border border-border/40 bg-secondary/20 p-6 backdrop-blur-sm lg:grid-cols-[1fr_auto] lg:items-start">
              <div>
                <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground xl:text-base">
                  <li>1. Use your active email and phone number for all event communication.</li>
                  <li>2. Participants can register for multiple events, but each form must be submitted separately.</li>
                  <li>3. Team events must include complete member details during registration.</li>
                  <li>4. Registration closes 48 hours before the event start time.</li>
                  <li>5. Carry a valid student ID or government ID for verification on event day.</li>
                </ul>
                <div className="mt-6">
                  <Link href="mailto:tnau.agronova26@gmail.com" passHref>
                    <Button>
                      Complete Registration <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mx-auto w-full max-w-[240px] lg:mx-0">
                <div className="relative rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-secondary/20 to-background/80 p-4 shadow-[0_16px_40px_-18px_rgba(34,199,116,0.65)]">
                  <div className="pointer-events-none absolute -inset-2 -z-10 rounded-[1.25rem] bg-gradient-to-br from-primary/30 to-secondary/25 blur-xl" />
                  <div className="relative overflow-hidden rounded-xl bg-white p-3 shadow-[0_12px_20px_-12px_rgba(0,0,0,0.6)] ring-1 ring-primary/20 [transform:perspective(1000px)_rotateX(8deg)_rotateY(-8deg)]">
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=320x320&bgcolor=ffffff&color=0e8f5a&data=https%3A%2F%2Fforms.gle%2F"
                      alt="Agronova registration QR code"
                      className="h-full w-full rounded-md"
                      loading="lazy"
                    />
                  </div>
                  <p className="mt-3 text-center text-xs font-medium uppercase tracking-[0.14em] text-foreground/80">
                    Scan To Register
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        {/* <section id="services" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  Need more info?
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    I got you.
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  Here are some of the services I offer. If you have any
                  questions, feel free to reach out.
                </p>
              </div>
              {services.map((service) => (
                <div
                  key={service.service}
                  className="flex h-[320px] flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                >
                  <service.icon className="my-6 text-primary" size={20} />
                  <span className="text-lg tracking-tight text-foreground">
                    {service.service}
                  </span>
                  <span className="mt-2 tracking-tighter text-muted-foreground">
                    {service.description}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section> */}

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            {/* <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Uyire Ponalum Vivasayatha{" "}
              <span className="text-gradient clash-grotesk">Vitradhinga.</span>
            </h2> */}
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-sm">
              Connect with the cultural wave.
            </p>
            <div className="mt-6 flex gap-4">
              <Link href="mailto:tnau.agronova26@gmail.com" passHref>
                <Button>Get in touch</Button>
              </Link>
              <a href="/308065124_464535789048420_7533850199481911634_n.jpg" download>
                <Button variant="outline">Brouchure.</Button>
              </a>
            </div>
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
