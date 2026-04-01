export type ProjectDetail = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  impact: string;
  period: string;
  context: string;
  problem: string;
  solution: string;
  results: string[];
  stack: { name: string; role: string }[];
};

export const PROJECTS_DATA: ProjectDetail[] = [
  {
    slug: "lakehouse-migration",
    title: "Migration DWH → Lakehouse",
    summary: "Refonte complète d'un entrepôt de données legacy vers une architecture Delta Lake sur Azure.",
    category: "Data Engineering",
    tags: ["Spark", "Delta Lake", "dbt", "Airflow", "Azure"],
    impact: "-60% query time",
    period: "6 mois — 2023",
    context:
      "Un retailer mid-market avec 200+ tables en SQL Server legacy, des pipelines ETL fragiles et des requêtes analytiques qui prenaient 2h en peak. L'équipe data de 4 personnes passait 60% du temps à déboguer plutôt qu'à produire de la valeur.",
    problem:
      "Architecture monolithique ingérable, coûts cloud explosifs, impossibilité de faire du time-travel ou de rejouer des données historiques. Les dashboards étaient souvent stale de 24h minimum.",
    solution:
      "Migration incrémentale vers Delta Lake sur Azure ADLS Gen2 avec Spark pour les transformations lourdes et dbt pour la couche sémantique. Orchestration via Airflow avec un DAG par domaine métier. Déploiement blue-green pour zéro downtime.",
    results: [
      "Réduction de 60% du query time moyen sur les dashboards critiques",
      "Passage de 24h à 2h de fraîcheur des données (SLA garanti)",
      "Réduction de 40% des coûts cloud grâce à la compression Delta et au Z-ordering",
      "100% des tables avec tests dbt et documentation automatique",
      "Zero incident en production depuis le déploiement",
    ],
    stack: [
      { name: "Delta Lake", role: "Format de stockage avec ACID transactions" },
      { name: "Apache Spark", role: "Transformations distribuées" },
      { name: "dbt", role: "Couche sémantique + tests + docs" },
      { name: "Apache Airflow", role: "Orchestration des DAGs" },
      { name: "Azure ADLS Gen2", role: "Stockage objet" },
      { name: "Azure Databricks", role: "Cluster Spark managé" },
    ],
  },
  {
    slug: "realtime-pipeline",
    title: "Pipeline Temps Réel",
    summary: "Ingestion Kafka → Flink → BigQuery pour du monitoring produit à la seconde.",
    category: "Data Engineering",
    tags: ["Kafka", "Flink", "BigQuery", "Python", "GCP"],
    impact: "<2s latency",
    period: "3 mois — 2022",
    context:
      "Une scale-up SaaS B2B avec 50k utilisateurs actifs. L'équipe produit était aveugle : les métriques d'usage n'arrivaient que le lendemain matin par batch. Impossible de détecter les anomalies ou d'agir en temps réel.",
    problem:
      "Architecture batch H-24, aucune visibilité en cours de journée, impossibilité de détecter les erreurs critiques avant que les clients ne se plaignent. Le support recevait des tickets 6h après les incidents.",
    solution:
      "Stack Kafka (Confluent Cloud) + Apache Flink pour le stream processing + BigQuery en sink. Les événements produit sont envoyés en temps réel, enrichis (GeoIP, user context) et matérialisés dans des tables partitionnées.",
    results: [
      "Latence de bout en bout < 2 secondes du clic au dashboard",
      "Détection d'anomalies en temps réel avec alertes Slack automatiques",
      "Réduction de 80% du délai moyen de détection des incidents (6h → 45min)",
      "Dashboard produit consulté 3x plus souvent qu'avant",
      "Architecture réutilisée pour 3 autres cas d'usage post-launch",
    ],
    stack: [
      { name: "Apache Kafka (Confluent)", role: "Bus d'événements" },
      { name: "Apache Flink", role: "Stream processing + enrichissement" },
      { name: "BigQuery", role: "Sink analytique" },
      { name: "Looker", role: "Dashboards temps réel" },
      { name: "Python", role: "Producers + consumer custom" },
      { name: "GCP Dataflow", role: "Fallback managed Flink" },
    ],
  },
  {
    slug: "ecommerce-analytics",
    title: "Analytics E-commerce",
    summary: "Modélisation dimensionnelle et suite de KPIs pour un retailer 50M€ CA.",
    category: "Analytics",
    tags: ["dbt", "Snowflake", "Looker", "SQL", "Python"],
    impact: "+30% revenue insight",
    period: "4 mois — 2022",
    context:
      "Un pure-player e-commerce avec 500k commandes/an. Les données étaient dans 6 sources différentes (Shopify, Stripe, Klaviyo, Google Ads, Meta, SAP). Aucune vue consolidée, chaque équipe avait ses propres chiffres.",
    problem:
      "Des chiffres contradictoires entre finance, marketing et produit. Le CMO et le CFO ne pouvaient pas aligner leurs reporting. L'équipe data passait 3 jours par semaine à réconcilier manuellement des Excel.",
    solution:
      "Modèle dimensionnel Kimball dans Snowflake avec dbt. Une source de vérité unique : ordres, clients, produits, campagnes. Looker pour les explorations libre-service + dashboards automatisés hebdo pour le CODIR.",
    results: [
      "Première réunion CODIR avec des chiffres alignés entre toutes les équipes",
      "Identification de 2 segments clients sous-exploités représentant +30% de CA potentiel",
      "Réduction de 90% du temps de réconciliation manuel (3j → 2h/semaine)",
      "18 dashboards en production, consultés par 40+ utilisateurs quotidiennement",
      "Attribution marketing multi-touch ayant guidé une réallocation de 20% du budget ads",
    ],
    stack: [
      { name: "Snowflake", role: "Data Warehouse" },
      { name: "dbt", role: "Transformations + modèle dimensionnel" },
      { name: "Fivetran", role: "Ingestion des 6 sources" },
      { name: "Looker", role: "BI layer + dashboards" },
      { name: "Python", role: "Scripts custom + attribution modeling" },
      { name: "dbt tests", role: "Data quality sur 100+ assertions" },
    ],
  },
  {
    slug: "ops-dashboard",
    title: "Dashboard Opérationnel",
    summary: "Tableau de bord temps réel pour le suivi des KPIs de production d'une usine.",
    category: "Dashboards",
    tags: ["Metabase", "PostgreSQL", "Python", "MQTT"],
    impact: "-45% temps de report",
    period: "2 mois — 2021",
    context:
      "Un industriel avec 3 lignes de production. Les responsables recevaient leurs KPIs le lundi matin sur un Excel généré manuellement le vendredi. En cas d'anomalie, personne n'était alerté avant le rapport.",
    problem:
      "Reporting hebdo manuel, aucune visibilité intra-journalière, réactivité nulle face aux pannes machine. Les pertes de production non détectées représentaient 5% du CA annuel.",
    solution:
      "Collecte des données machine via MQTT → Python consumer → PostgreSQL. Dashboard Metabase avec actualisation toutes les 5 minutes. Alertes email/SMS sur seuils critiques via un script Python dédié.",
    results: [
      "Réduction de 45% du temps consacré au reporting manuel",
      "Détection des arrêts machine en < 10 minutes (vs 24-48h avant)",
      "Récupération estimée à 3% de CA grâce à la détection précoce",
      "Dashboard adopté par 100% des chefs de ligne sans formation",
      "ROI du projet atteint en 6 semaines",
    ],
    stack: [
      { name: "PostgreSQL", role: "Stockage des données machine" },
      { name: "Python", role: "Consumer MQTT + alertes" },
      { name: "MQTT", role: "Protocole IoT machines" },
      { name: "Metabase", role: "Dashboard + alertes email" },
      { name: "Docker", role: "Déploiement on-premise" },
    ],
  },
  {
    slug: "feature-store",
    title: "Feature Store ML",
    summary: "Mise en place d'un feature store centralisé pour accélérer les cycles ML.",
    category: "Data Engineering",
    tags: ["Feast", "Redis", "dbt", "Python", "Kubernetes"],
    impact: "x4 feature reuse",
    period: "5 mois — 2022",
    context:
      "Une équipe ML de 8 data scientists qui recalculaient les mêmes features pour chaque nouveau modèle. Duplication massive de code, cohérence impossible entre les features de training et de serving.",
    problem:
      "Training/serving skew récurrent, features recalculées 3-4 fois par équipe différente, mise en production des modèles prenant 3 semaines en moyenne à cause du pipeline feature.",
    solution:
      "Feature store Feast avec stockage offline (BigQuery) et online (Redis). Les features dbt existantes exposées via Feast. Pipeline CI/CD pour la validation et le déploiement automatique des nouvelles features.",
    results: [
      "Taux de réutilisation des features multiplié par 4 en 6 mois",
      "Réduction du temps de mise en production des modèles de 3 semaines à 4 jours",
      "Zero training/serving skew sur les 12 modèles en production",
      "Catalogue de 200+ features documentées et versionées",
      "Adoption par 100% de l'équipe ML en 2 mois",
    ],
    stack: [
      { name: "Feast", role: "Feature store framework" },
      { name: "Redis", role: "Feature store online (serving)" },
      { name: "BigQuery", role: "Feature store offline (training)" },
      { name: "dbt", role: "Calcul des features batch" },
      { name: "Kubernetes", role: "Déploiement du serving layer" },
      { name: "Python", role: "SDK feature engineering" },
    ],
  },
  {
    slug: "data-quality-platform",
    title: "Plateforme Data Quality",
    summary: "Framework de tests automatisés et monitoring de la qualité sur 200+ tables.",
    category: "Analytics",
    tags: ["Great Expectations", "dbt", "Airflow", "Slack", "Python"],
    impact: "99.8% data SLA",
    period: "3 mois — 2023",
    context:
      "Un groupe financier avec des contraintes réglementaires strictes sur la qualité des données. Les équipes métier perdaient confiance dans les chiffres après plusieurs incidents de données corrompues en production.",
    problem:
      "Aucun filet de sécurité sur les pipelines, des données erronées découvertes par les utilisateurs métier, des incidents remontés en CODIR. La DQ était assurée manuellement par un analyste senior 1j/semaine.",
    solution:
      "Framework DQ multicouche : dbt tests sur toutes les transformations + Great Expectations sur les données sources + monitoring de fraîcheur Airflow + dashboard de SLA Metabase + alertes Slack graduées (warning/critical).",
    results: [
      "SLA de qualité données à 99.8% maintenu sur 6 mois",
      "Détection de 100% des anomalies avant qu'elles atteignent les utilisateurs",
      "Réduction de 70% des tickets data quality remontés par le métier",
      "500+ assertions de qualité en production sur 200 tables",
      "Rapport DQ automatique chaque matin dans le channel Slack dédié",
    ],
    stack: [
      { name: "dbt tests", role: "Tests sur les transformations" },
      { name: "Great Expectations", role: "Validation des sources" },
      { name: "Apache Airflow", role: "Orchestration + monitoring fraîcheur" },
      { name: "Metabase", role: "Dashboard SLA qualité" },
      { name: "Slack API", role: "Alertes graduées" },
      { name: "Python", role: "Custom expectations + reporting" },
    ],
  },
];

export function getProject(slug: string): ProjectDetail | undefined {
  return PROJECTS_DATA.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return PROJECTS_DATA.map((p) => p.slug);
}
