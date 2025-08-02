"use client"

import type React from "react"
import Image from "next/image"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Download,
  Menu,
  X,
  Code,
  Smartphone,
  Server,
  Database,
  Send,
  User,
  MessageSquare,
  ExternalLink,
  Quote,
} from "lucide-react"

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "experience", "projects", "education", "testimonials", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus("idle"), 5000)
    }
  }

  const TypewriterText = ({ text, delay = 100 }: { text: string; delay?: number }) => {
    const [displayText, setDisplayText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayText((prev) => prev + text[currentIndex])
          setCurrentIndex((prev) => prev + 1)
        }, delay)
        return () => clearTimeout(timeout)
      }
    }, [currentIndex, text, delay])

    return (
      <span>
        {displayText}
        <span className="animate-pulse">|</span>
      </span>
    )
  }

  const skills = {
    languages: ["Kotlin", "Java", "Python", "C/C++", "JavaScript", "SQL", "HTML/CSS"],
    frameworks: ["Spring Boot", "Android Development", "Jetpack Compose", "Flask", "Material-UI"],
    tools: [
      "Git",
      "GitHub",
      "Docker",
      "Android Studio",
      "VS Code",
      "PyCharm",
      "IntelliJ",
      "Postman",
      "MongoDB Atlas",
      "Firebase",
      "Veeam Backup",
    ],
    libraries: [
      "Retrofit",
      "Volley",
      "Hilt",
      "RoomDB",
      "Picasso",
      "Glide",
      "Flyway",
      "Spring Cloud OpenFeign",
      "JUnit",
      "Mockito",
    ],
  }

  const projects = [
    {
      title: "E-Commerce Microservices App",
      tech: "Java, Spring Boot",
      date: "March 2024",
      description:
        "Designed and developed a scalable e-commerce backend system using Java and Spring Boot with microservices architecture.",
      highlights: [
        "Implemented four independent services: Product, Order, Inventory, and API Gateway",
        "Secured with OAuth2 for authentication and authorization",
        "Used MongoDB and MySQL for distributed data handling",
        "Integrated Resilience4j for circuit breakers and fault tolerance",
      ],
      github: "https://github.com/Yasiraalam/E-commerce-MicroServices-arch",
      liveDemo: "https://ecommerce-demo.yasiralam.dev",
      icon: <Server className="h-6 w-6" />,
      color: "from-purple-500 to-pink-500",
      image: "/images/ecommerce-microservices.png",
    },
    {
      title: "ZipFeast: Beyond Shopping",
      tech: "Kotlin, Jetpack Compose, React, Node.js, Prisma",
      date: "Jan - June 2024",
      description: "Innovative e-commerce platform integrating grocery shopping and home services.",
      highlights: [
        "Led mobile app development using Kotlin and Jetpack Compose",
        "Followed MVVM architecture for code modularity",
        "Implemented Hilt for dependency injection",
        "Real-time inventory management in mobile app",
      ],
      github: "https://github.com/Yasiraalam/Zip-Feast-App",
      liveDemo: "https://zipfeast.yasiralam.dev",
      icon: <Smartphone className="h-6 w-6" />,
      color: "from-emerald-500 to-teal-500",
      image: "/images/zipfeast.png",
    },
    {
      title: "SnapIt - Photo Sharing App",
      tech: "Kotlin, Jetpack Compose, Firebase",
      date: "September 2024",
      description: "A modern photo-sharing social media application built with Jetpack Compose and Firebase backend.",
      highlights: [
        "Built with 100% Jetpack Compose for modern Android UI",
        "Firebase Authentication for secure user management",
        "Real-time photo sharing and social interactions",
        "Clean Architecture with MVVM pattern implementation",
        "Material Design 3 components for consistent UI/UX",
      ],
      github: "https://github.com/Yasiraalam/Snappit",
      icon: <Smartphone className="h-6 w-6" />,
      color: "from-pink-500 to-rose-500",
      image: "/images/snapit.png",
    },
    {
      title: "VideoPlayer App",
      tech: "Kotlin, XML, ExoPlayer",
      date: "January 2023",
      description: "Advanced video player application supporting multiple video formats with smooth playback.",
      highlights: [
        "Utilized ExoPlayer for smooth video playback",
        "Comprehensive playlist management functionality",
        "Material Design guidelines implementation",
        "MVVM architecture for scalability",
      ],
      github: "https://github.com/Yasiraalam/VideoPlayer-Yas",
      icon: <Code className="h-6 w-6" />,
      color: "from-orange-500 to-red-500",
      image: "/images/videoplayer.png",
    },
  ]

  const testimonials = [
    {
      quote:
        "Yasir is a highly dedicated and skilled developer. His ability to quickly grasp complex concepts and deliver robust solutions is truly impressive. He was a valuable asset to our team.",
      name: "Jane Doe",
      title: "Senior Software Engineer at TechCorp",
      avatar: "/images/placeholder-user.jpg",
    },
    {
      quote:
        "Working with Yasir was a pleasure. He consistently delivered high-quality code and showed great initiative in tackling challenging problems. His passion for mobile development is evident in his work.",
      name: "John Smith",
      title: "Project Manager at Innovate Mobile",
      avatar: "/images/placeholder-user.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        {/* Floating Particles */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          ></div>
        ))}
        {/* Mouse Follower */}
        <div
          className="absolute w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl transition-all duration-1000 ease-out pointer-events-none"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-xl font-bold text-emerald-400 animate-glow">
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Yasir Alam
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["Home", "About", "Skills", "Experience", "Projects", "Education", "Testimonials", "Contact"].map(
                (item, index) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`relative hover:text-emerald-400 transition-all duration-300 transform hover:scale-110 ${
                      activeSection === item.toLowerCase() ? "text-emerald-400" : "text-slate-300"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {item}
                    {activeSection === item.toLowerCase() && (
                      <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-400 to-teal-400 animate-expand"></div>
                    )}
                  </button>
                ),
              )}
            </div>

            {/* Mobile Navigation Button */}
            <button
              className="md:hidden transform transition-transform duration-300 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-800 animate-slideDown">
              {["Home", "About", "Skills", "Experience", "Projects", "Education", "Testimonials", "Contact"].map(
                (item, index) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block w-full text-left py-2 hover:text-emerald-400 transition-all duration-300 transform hover:translate-x-2"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="text-center">
            {/* Animated Avatar */}
            <div
              className={`mb-8 transform transition-all duration-1000 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <div className="relative w-40 h-40 mx-auto mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-500 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-2 rounded-full overflow-hidden">
                  <Image
                    src="/images/yasir-profile.jpg"
                    alt="Yasir Alam"
                    width={160} // Corresponds to w-40 (160px)
                    height={160} // Corresponds to h-40 (160px)
                    priority // Loads the image with high priority as it's above the fold
                    quality={100} // Maintain high quality for the profile picture
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-xl animate-pulse"></div>
              </div>
            </div>

            {/* Animated Title */}
            <div
              className={`transform transition-all duration-1000 delay-300 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="block text-slate-300">Hi, I’m</span>
                <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                  {isLoaded && <TypewriterText text="Yasir Alam — Software Engineer" delay={150} />}
                </span>
              </h1>
            </div>

            {/* Animated Subtitle */}
            <div
              className={`transform transition-all duration-1000 delay-500 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                <span className="bg-gradient-to-r from-slate-300 to-slate-100 bg-clip-text text-transparent">
                  Building
                </span>
                <span className="text-emerald-400 font-semibold"> robust backend systems </span>
                <span className="bg-gradient-to-r from-slate-300 to-slate-100 bg-clip-text text-transparent">and</span>
                <span className="text-teal-400 font-semibold"> intuitive mobile experiences</span>
              </p>
            </div>

            {/* Animated Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 transform transition-all duration-1000 delay-700 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <Button
                onClick={() => scrollToSection("contact")}
                className="group relative bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-8 py-4 text-lg font-semibold rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25"
              >
                <span className="relative z-10">Get In Touch</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Button>
              <a
                href="https://drive.google.com/file/d/1hBEqMdlt8rKZn4XswaHCGOZM3Ae8ReKp/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative border-2 border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 px-8 py-4 text-lg font-semibold bg-transparent rounded-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25 flex items-center justify-center"
              >
                <Download className="mr-2 h-5 w-5 group-hover:animate-bounce" />
                <span>Download CV</span>
              </a>
            </div>

            {/* Animated Social Links */}
            <div
              className={`flex justify-center space-x-8 transform transition-all duration-1000 delay-900 ${isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              {[
                { icon: Github, href: "https://github.com/Yasiraalam", delay: "0ms" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/yasir-alam-89862422b/", delay: "100ms" },
                { icon: Twitter, href: "https://x.com/home?lang=en", delay: "200ms" },
              ].map(({ icon: Icon, href, delay }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-4 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700 hover:border-emerald-400 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2"
                  style={{ animationDelay: delay }}
                >
                  <Icon className="h-6 w-6 text-slate-400 group-hover:text-emerald-400 transition-colors duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 rounded-full blur-xl animate-pulse"></div>
                </a>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-6 h-10 border-2 border-emerald-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-emerald-400 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 animate-slideInLeft">
              <p className="text-lg text-slate-300 leading-relaxed">
                I'm a versatile Backend and Native Android Developer with hands-on experience in building scalable
                applications using Spring Boot and Java & Kotlin. I specialize in designing and integrating RESTful
                APIs, managing relational databases, and delivering smooth mobile experiences on Android.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Additionally, I have hands-on experience with Veeam Backup and Replication for data protection and
                disaster recovery. I'm passionate about creating robust backend systems and intuitive front-end
                interactions.
              </p>
              <div className="flex items-center space-x-4 text-slate-400 group">
                <MapPin size={20} className="text-emerald-400 group-hover:animate-pulse" />
                <span className="group-hover:text-emerald-400 transition-colors duration-300">
                  Bandipora, Jammu and Kashmir, India
                </span>
              </div>
            </div>
            <div className="space-y-6 animate-slideInRight">
              {[
                {
                  title: "Backend Development",
                  description: "Spring Boot, Java, Kotlin, RESTful APIs, Microservices",
                  icon: <Server className="h-8 w-8" />,
                  color: "from-purple-500 to-pink-500",
                },
                {
                  title: "Mobile Development",
                  description: "Android, Kotlin, Jetpack Compose, MVVM Architecture",
                  icon: <Smartphone className="h-8 w-8" />,
                  color: "from-emerald-500 to-teal-500",
                },
                {
                  title: "Data & DevOps",
                  description: "MongoDB, MySQL, Docker, Veeam Backup & Replication",
                  icon: <Database className="h-8 w-8" />,
                  color: "from-orange-500 to-red-500",
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  className="group bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-emerald-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color} group-hover:animate-pulse`}>
                        <div className="text-white">{item.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-emerald-400 mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Languages", items: skills.languages, color: "from-purple-500 to-pink-500" },
              { title: "Frameworks", items: skills.frameworks, color: "from-emerald-500 to-teal-500" },
              { title: "Developer Tools", items: skills.tools, color: "from-orange-500 to-red-500" },
              { title: "Libraries", items: skills.libraries, color: "from-cyan-500 to-blue-500" },
            ].map((category, index) => (
              <Card
                key={index}
                className="group bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-emerald-400/50 transition-all duration-500 transform hover:scale-105 animate-fadeInUp"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  <CardTitle
                    className={`bg-gradient-to-r ${category.color} bg-clip-text text-transparent group-hover:animate-pulse`}
                  >
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill, skillIndex) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-slate-700/50 text-slate-200 hover:bg-emerald-600 hover:text-white transition-all duration-300 transform hover:scale-110 cursor-pointer"
                        style={{ animationDelay: `${skillIndex * 50}ms` }}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="space-y-8">
            {/* Current Experience */}
            <Card className="group bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-emerald-400/50 transition-all duration-500 transform hover:scale-105 animate-fadeInUp">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-2xl bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent group-hover:animate-pulse">
                      Android Developer Intern
                    </CardTitle>
                    <CardDescription className="text-lg text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                      Minipix • Remote
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-emerald-400 text-emerald-400 mt-2 md:mt-0 group-hover:bg-emerald-400 group-hover:text-slate-900 transition-all duration-300"
                  >
                    Currently Working
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-slate-300">
                  {[
                    "Currently working as an Android Developer Intern focusing on mobile application development",
                    "Developing native Android applications using Kotlin and modern Android development practices",
                    "Collaborating with cross-functional teams to deliver high-quality mobile solutions",
                    "Implementing UI/UX designs using Jetpack Compose and Material Design principles",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start group-hover:text-slate-200 transition-colors duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="text-emerald-400 mr-3 mt-1 group-hover:animate-pulse">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Previous Experience */}
            <Card className="group bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-emerald-400/50 transition-all duration-500 transform hover:scale-105 animate-fadeInUp">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="text-2xl bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent group-hover:animate-pulse">
                      Native Android Intern
                    </CardTitle>
                    <CardDescription className="text-lg text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                      Novo Cabs • Delhi
                    </CardDescription>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-slate-600 text-slate-400 mt-2 md:mt-0 group-hover:border-emerald-400 group-hover:text-emerald-400 transition-all duration-300"
                  >
                    Dec 2022 – Feb 2023
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-slate-300">
                  {[
                    "Successfully completed a dynamic internship involving coding, testing, and implementing features",
                    "Developed expertise in visualizing and automating daily test reports using Kotlin, Java, Jetpack Compose, and XML",
                    "Developed a REST API using Flask, MongoDB, and MySQL for learning management systems",
                    "Explored ways to visualize GitHub collaboration in classroom settings",
                  ].map((item, index) => (
                    <li
                      key={index}
                      className="flex items-start group-hover:text-slate-200 transition-colors duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <span className="text-emerald-400 mr-3 mt-1 group-hover:animate-pulse">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-emerald-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 animate-fadeInUp"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardHeader>
                  {project.image && (
                    <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${project.color} group-hover:animate-pulse`}>
                      <div className="text-white">{project.icon}</div>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-slate-600 text-slate-400 group-hover:border-emerald-400 group-hover:text-emerald-400 transition-all duration-300"
                    >
                      {project.date}
                    </Badge>
                  </div>
                  <CardTitle className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent group-hover:animate-pulse mb-2">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    {project.tech}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-6 group-hover:text-slate-200 transition-colors duration-300">
                    {project.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {project.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-slate-400 flex items-start group-hover:text-slate-300 transition-colors duration-300"
                      >
                        <span className="text-emerald-400 mr-2 text-xs group-hover:animate-pulse">▸</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="group/btn border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 bg-transparent transition-all duration-300 transform hover:scale-105"
                      onClick={() => window.open(project.github, "_blank")}
                    >
                      <Github className="mr-2 h-4 w-4 group-hover/btn:animate-spin" />
                      View Code
                    </Button>
                    {project.liveDemo && (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white transition-all duration-300 transform hover:scale-105"
                        onClick={() => window.open(project.liveDemo, "_blank")}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Education
          </h2>
          <Card className="group bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-emerald-400/50 max-w-4xl mx-auto transition-all duration-500 transform hover:scale-105 animate-fadeInUp">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-2xl bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent group-hover:animate-pulse">
                    Bachelor of Science in Computer Science and Engineering
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-300 group-hover:text-slate-200 transition-colors duration-300">
                    Islamic University of Science and Technology
                  </CardDescription>
                  <CardDescription className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                    Awantipora, Pulwama
                  </CardDescription>
                </div>
                <Badge
                  variant="outline"
                  className="border-emerald-400 text-emerald-400 mt-2 md:mt-0 group-hover:bg-emerald-400 group-hover:text-slate-900 transition-all duration-300"
                >
                  Oct 2020 – 2024
                </Badge>
              </div>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Testimonials
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="group bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-emerald-400/50 transition-all duration-500 transform hover:scale-105 animate-fadeInUp"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-emerald-400 mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                  <p className="text-lg text-slate-300 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center space-x-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover border-2 border-emerald-400 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div>
                      <p className="font-semibold text-emerald-400">{testimonial.name}</p>
                      <p className="text-sm text-slate-400">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="max-w-6xl mx-auto">
            <p className="text-xl text-slate-300 mb-12 leading-relaxed text-center">
              I'm always interested in new opportunities and exciting projects. Whether you have a question or just want
              to say hi, feel free to reach out!
            </p>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-emerald-400 mb-6">Contact Information</h3>
                <div className="grid gap-6">
                  {[
                    {
                      icon: Mail,
                      text: "yasiralam981@gmail.com",
                      color: "from-purple-500 to-pink-500",
                      href: "mailto:yasiralam981@gmail.com",
                    },
                    {
                      icon: Phone,
                      text: "+91-7889904799",
                      color: "from-emerald-500 to-teal-500",
                      href: "tel:+917889904799",
                    },
                    {
                      icon: MapPin,
                      text: "Bandipora, Jammu and Kashmir, India",
                      color: "from-orange-500 to-red-500",
                      href: "https://maps.google.com/?q=Bandipora,Jammu+and+Kashmir,India",
                    },
                  ].map((item, index) => (
                    <Card
                      key={index}
                      className="group bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-emerald-400/50 transition-all duration-500 transform hover:scale-105 animate-fadeInUp cursor-pointer"
                      style={{ animationDelay: `${index * 200}ms` }}
                      onClick={() => window.open(item.href, "_blank")}
                    >
                      <CardContent className="p-6 flex items-center space-x-4">
                        <div
                          className={`p-3 rounded-full bg-gradient-to-r ${item.color} group-hover:animate-pulse flex-shrink-0`}
                        >
                          <item.icon className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-slate-300 group-hover:text-emerald-400 transition-colors duration-300 font-medium">
                          {item.text}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Social Links */}
                <div className="pt-8">
                  <h4 className="text-lg font-semibold text-slate-300 mb-4">Follow Me</h4>
                  <div className="flex space-x-4">
                    {[
                      { icon: Github, href: "https://github.com/Yasiraalam", color: "from-purple-500 to-pink-500" },
                      {
                        icon: Linkedin,
                        href: "https://www.linkedin.com/in/yasir-alam-89862422b/",
                        color: "from-emerald-500 to-teal-500",
                      },
                      { icon: Twitter, href: "https://x.com/home?lang=en", color: "from-orange-500 to-red-500" },
                    ].map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative p-4 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700 hover:border-emerald-400/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 animate-fadeInUp"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <item.icon className="h-6 w-6 text-slate-400 group-hover:text-white transition-colors duration-300" />
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                        ></div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="animate-fadeInUp" style={{ animationDelay: "400ms" }}>
                <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 hover:border-emerald-400/50 transition-all duration-500">
                  <CardHeader>
                    <CardTitle className="text-2xl bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent flex items-center">
                      <MessageSquare className="mr-3 h-6 w-6 text-emerald-400" />
                      Send Message
                    </CardTitle>
                    <CardDescription className="text-slate-300">
                      Fill out the form below and I'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-slate-300 flex items-center">
                            <User className="mr-2 h-4 w-4 text-emerald-400" />
                            Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400 transition-all duration-300"
                            placeholder="Your full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-slate-300 flex items-center">
                            <Mail className="mr-2 h-4 w-4 text-emerald-400" />
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400 transition-all duration-300"
                            placeholder="your.email@example.com"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-slate-300">
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400 transition-all duration-300"
                          placeholder="What's this about?"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-slate-300">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          rows={5}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400 focus:ring-emerald-400 transition-all duration-300 resize-none"
                          placeholder="Tell me about your project or just say hello..."
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold py-3 rounded-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Send className="mr-2 h-5 w-5" />
                            Send Message
                          </div>
                        )}
                      </Button>
                      {submitStatus === "success" && (
                        <div className="p-4 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-400 text-center animate-fadeInUp">
                          ✅ Message sent successfully! I'll get back to you soon.
                        </div>
                      )}
                      {submitStatus === "error" && (
                        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center animate-fadeInUp">
                          ❌ Failed to send message. Please try again or contact me directly.
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 sm:px-6 lg:px-8 bg-slate-800/50 backdrop-blur-sm border-t border-slate-700/50">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <p className="text-slate-400 text-lg">
            © 2024 Yasir Alam. Built with <span className="text-emerald-400 animate-pulse">❤️</span> using Next.js and
            Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  )
}
