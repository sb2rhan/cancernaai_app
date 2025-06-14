import {useEffect, useRef, useState, type ChangeEventHandler, type ChangeEvent} from "react";
import {
    Upload, Brain, Activity, AlertCircle, CheckCircle,
    TrendingUp, Eye, FileText, Download,
    Play, Pause, RotateCcw }
from 'lucide-react';


const TrialPage = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisComplete, setAnalysisComplete] = useState(false);
    const [results, setResults] = useState(null);
    const [currentView, setCurrentView] = useState('upload');
    const [animationProgress, setAnimationProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const fileInputRef = useRef(null);

    const resetDemo = () => {
        setUploadedFile(null);
        setIsAnalyzing(false);
        setAnalysisComplete(false);
        setResults(null);
        setCurrentView('upload');
        setAnimationProgress(0);
        setIsPlaying(false);
    };

    // Simulate analysis process
    const simulateAnalysis = () => {
        setIsAnalyzing(true);
        setCurrentView('analysis');

        setTimeout(() => {
            setResults({
                classification: {
                    prediction: 'Malignant',
                    confidence: 0.87,
                    risk_score: 0.78,
                    uncertainty: 0.13
                },
                segmentation: {
                    nodule_volume: '2.34 cm³',
                    diameter: '14.2 mm',
                    density: '-15 HU',
                    shape_irregularity: 0.67,
                    unet_confidence: 0.91
                },
                clinical: {
                    stage_prediction: 'T1aN0M0 (Stage IA)',
                    metastasis_risk: 'Low (12%)',
                    growth_velocity: '2.1 mm/year',
                    recommended_action: 'Surgical consultation recommended'
                },
                fuzzy_analysis: {
                    membership_scores: {
                        benign: 0.13,
                        malignant: 0.87,
                        uncertain: 0.05
                    },
                    risk_factors: [
                        { factor: 'Size', score: 0.8, weight: 0.4 },
                        { factor: 'Density', score: 0.6, weight: 0.3 },
                        { factor: 'Shape', score: 0.9, weight: 0.3 }
                    ]
                }
            });
            setIsAnalyzing(false);
            setAnalysisComplete(true);
            setCurrentView('results');
        }, 4000);
    };

    const handleFileUpload: ChangeEventHandler<HTMLInputElement> =
        (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setUploadedFile(file);
            setCurrentView('preview');
        }
    };

    // Animation for 3D visualization
    useEffect(() => {
        let interval: number | undefined;
        if (isPlaying) {
            interval = setInterval(() => {
                setAnimationProgress(prev => (prev + 1) % 100);
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isPlaying]);

    // Trial Page Components
    const TrialUploadSection = () => {
        resetDemo();
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
                <section className="pt-24 pb-12 px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-white mb-4">AI Analysis Demo</h1>
                            <p className="text-xl text-gray-300">
                                Upload a CT scan to experience Cancerna Lab's 3D U-Net analysis
                            </p>
                        </div>

                        {/* Upload Area */}
                        <div
                            className="bg-white/10 backdrop-blur-md rounded-2xl border-2 border-dashed border-cyan-400 p-16 text-center hover:bg-white/20 transition-all cursor-pointer mb-8"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".nii,.nii.gz,.dcm,.jpg,.png"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                            <Upload className="w-20 h-20 text-cyan-400 mx-auto mb-6" />
                            <h2 className="text-3xl font-semibold text-white mb-4">Upload CT Scan</h2>
                            <p className="text-gray-300 mb-6 text-lg">
                                Supports NIfTI (.nii, .nii.gz), DICOM (.dcm), or standard image formats
                            </p>
                            <div className="bg-cyan-500 hover:bg-cyan-600 text-white px-10 py-4 rounded-lg font-semibold inline-block transition-colors text-lg">
                                Choose File
                            </div>
                        </div>

                        {/* Features */}
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
                                <Brain className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">3D U-Net Processing</h3>
                                <p className="text-gray-300 text-sm">Volumetric segmentation with encoder-decoder architecture</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
                                <Activity className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">Fuzzy Logic Analysis</h3>
                                <p className="text-gray-300 text-sm">Uncertainty quantification with confidence scoring</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-center">
                                <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
                                <h3 className="text-lg font-semibold text-white mb-2">Clinical Insights</h3>
                                <p className="text-gray-300 text-sm">Metastasis prediction and treatment recommendations</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    const TrialPreviewSection = () => (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
            <section className="pt-24 pb-12 px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                        <h1 className="text-3xl font-bold text-white mb-8">Scan Preview & Analysis Setup</h1>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* File Info */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold text-white">File Information</h2>
                                <div className="bg-black/30 rounded-xl p-6 space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-cyan-400 font-semibold">Filename:</span>
                                        <span className="text-white">{uploadedFile?.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-cyan-400 font-semibold">Size:</span>
                                        <span className="text-white">{(uploadedFile?.size / 1024 / 1024).toFixed(2)} MB</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-cyan-400 font-semibold">Type:</span>
                                        <span className="text-white">{uploadedFile?.type || 'Medical Image'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-cyan-400 font-semibold">Status:</span>
                                        <span className="text-green-400">Ready for 3D U-Net Analysis</span>
                                    </div>
                                </div>

                                <div className="bg-blue-500/20 border border-blue-400 rounded-xl p-4">
                                    <h3 className="text-lg font-semibold text-white mb-2">Analysis Pipeline</h3>
                                    <ul className="space-y-2 text-sm text-gray-300">
                                        <li>• 3D U-Net volumetric segmentation</li>
                                        <li>• Fuzzy logic uncertainty analysis</li>
                                        <li>• Clinical risk stratification</li>
                                        <li>• Metastasis prediction modeling</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Preview Area */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-semibold text-white">3D Visualization Preview</h2>
                                <div className="bg-black/30 rounded-xl p-8 h-80 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                                            <Eye className="w-12 h-12 text-white" />
                                        </div>
                                        <p className="text-gray-300 text-lg">3D Volume Rendering</p>
                                        <p className="text-sm text-gray-500">Processing will begin after analysis starts</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center space-x-6 mt-12">
                            <button
                                onClick={simulateAnalysis}
                                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-4 rounded-xl font-semibold flex items-center space-x-3 transition-all transform hover:scale-105"
                            >
                                <Brain className="w-6 h-6" />
                                <span>Start 3D U-Net Analysis</span>
                            </button>
                            <button
                                onClick={resetDemo}
                                className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
                            >
                                Upload Different File
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

    const TrialAnalysisSection = () => (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center">
            <div className="text-center max-w-2xl mx-auto px-8">
                <div className="relative mb-12">
                    <div className="w-40 h-40 mx-auto">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="rgba(255,255,255,0.2)"
                                strokeWidth="6"
                                fill="transparent"
                            />
                            <circle
                                cx="50"
                                cy="50"
                                r="40"
                                stroke="url(#gradient)"
                                strokeWidth="6"
                                fill="transparent"
                                strokeDasharray={`${animationProgress * 2.51} 251`}
                                className="transition-all duration-300"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#06b6d4" />
                                    <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Brain className="w-16 h-16 text-cyan-400 animate-pulse" />
                        </div>
                    </div>
                </div>

                <h1 className="text-5xl font-bold text-white mb-6">3D U-Net Analysis</h1>
                <p className="text-xl text-gray-300 mb-12">
                    Processing volumetric data through our advanced encoder-decoder architecture...
                </p>

                <div className="space-y-4 text-gray-300 max-w-md mx-auto">
                    <div className="flex items-center space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <span>3D Volume Preprocessing</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                        <span>U-Net Encoder Processing</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                        <span>Skip Connection Integration</span>
                    </div>
                    <div className="flex items-center space-x-3 opacity-50">
                        <div className="w-6 h-6 border-2 border-gray-500 rounded-full" />
                        <span>Fuzzy Logic Uncertainty Analysis</span>
                    </div>
                    <div className="flex items-center space-x-3 opacity-50">
                        <div className="w-6 h-6 border-2 border-gray-500 rounded-full" />
                        <span>Clinical Report Generation</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const TrialResultsSection = () => (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900">
            <section className="pt-24 pb-12 px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">3D U-Net Analysis Complete</h1>
                        <p className="text-gray-300">Comprehensive AI-powered lung nodule assessment with fuzzy logic</p>
                    </div>

                    {/* Main Results Grid */}
                    <div className="grid lg:grid-cols-3 gap-6 mb-8">
                        {/* Classification Results */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                                <AlertCircle className="w-6 h-6 text-red-400 mr-2" />
                                Classification Results
                            </h2>

                            <div className="space-y-4">
                                <div className="bg-red-500/20 border border-red-400 rounded-lg p-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-red-300 font-semibold">Malignant Detected</span>
                                        <span className="text-white font-bold">{(results?.classification.confidence * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-3">
                                        <div
                                            className="bg-red-500 h-3 rounded-full transition-all duration-1000"
                                            style={{ width: `${results?.classification.confidence * 100}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="bg-black/30 rounded-lg p-4 space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">U-Net Confidence:</span>
                                        <span className="text-cyan-400 font-semibold">{(results?.segmentation.unet_confidence * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Risk Score:</span>
                                        <span className="text-orange-400 font-semibold">{(results?.classification.risk_score * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-300">Uncertainty:</span>
                                        <span className="text-yellow-400 font-semibold">{(results?.classification.uncertainty * 100).toFixed(1)}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3D U-Net Segmentation */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-white flex items-center">
                                    <Eye className="w-6 h-6 text-cyan-400 mr-2" />
                                    3D U-Net Segmentation
                                </h2>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="bg-cyan-500 hover:bg-cyan-600 text-white p-2 rounded transition-colors"
                                    >
                                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                    </button>
                                    <button
                                        onClick={() => setAnimationProgress(0)}
                                        className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded transition-colors"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-black/50 rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                                <div
                                    className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-full opacity-80 relative"
                                    style={{
                                        transform: `rotateY(${animationProgress * 3.6}deg) rotateX(${Math.sin(animationProgress * 0.1) * 10}deg)`
                                    }}
                                >
                                    <div className="absolute inset-2 bg-gradient-to-br from-red-600 to-red-800 rounded-full opacity-60" />
                                </div>
                                <div className="absolute top-3 left-3 text-xs text-gray-400">
                                    Nodule: {results?.segmentation.diameter}
                                </div>
                                <div className="absolute bottom-3 right-3 text-xs text-cyan-400">
                                    U-Net Processed
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                                <div className="bg-black/30 rounded p-2">
                                    <span className="text-gray-400">Volume:</span>
                                    <span className="text-white ml-2">{results?.segmentation.nodule_volume}</span>
                                </div>
                                <div className="bg-black/30 rounded p-2">
                                    <span className="text-gray-400">Density:</span>
                                    <span className="text-white ml-2">{results?.segmentation.density}</span>
                                </div>
                            </div>
                        </div>

                        {/* Clinical Assessment */}
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                                <FileText className="w-6 h-6 text-green-400 mr-2" />
                                Clinical Assessment
                            </h2>

                            <div className="space-y-4">
                                <div className="bg-black/30 rounded-lg p-3">
                                    <h3 className="text-green-400 font-semibold mb-2">Stage Prediction</h3>
                                    <p className="text-white text-sm">{results?.clinical.stage_prediction}</p>
                                </div>

                                <div className="bg-black/30 rounded-lg p-3">
                                    <h3 className="text-blue-400 font-semibold mb-2">Metastasis Risk</h3>
                                    <p className="text-white text-sm">{results?.clinical.metastasis_risk}</p>
                                </div>

                                <div className="bg-black/30 rounded-lg p-3">
                                    <h3 className="text-purple-400 font-semibold mb-2">AI Recommendation</h3>
                                    <p className="text-white text-sm">{results?.clinical.recommended_action}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fuzzy Logic Analysis */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-8">
                        <h2 className="text-2xl font-semibold text-white mb-6 flex items-center">
                            <Activity className="w-7 h-7 text-purple-400 mr-3" />
                            Fuzzy Logic Uncertainty Analysis
                        </h2>

                        <div className="grid lg:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Membership Function Scores</h3>
                                <div className="space-y-4">
                                    {Object.entries(results?.fuzzy_analysis.membership_scores || {}).map(([label, score]) => (
                                        <div key={label} className="flex items-center space-x-4">
                                            <span className="text-gray-300 w-24 capitalize font-medium">{label}:</span>
                                            <div className="flex-1 bg-gray-700 rounded-full h-3">
                                                <div
                                                    className={`h-3 rounded-full transition-all duration-1000 ${
                                                        label === 'malignant' ? 'bg-red-500' :
                                                            label === 'benign' ? 'bg-green-500' : 'bg-yellow-500'
                                                    }`}
                                                    style={{ width: `${score * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-white w-14 text-right font-semibold">{(score * 100).toFixed(0)}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Risk Factor Contributions</h3>
                                <div className="space-y-3">
                                    {results?.fuzzy_analysis.risk_factors.map((factor, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-black/30 rounded-lg p-3">
                                            <span className="text-gray-300 font-medium">{factor.factor}</span>
                                            <div className="flex items-center space-x-3">
                                                <span className="text-white font-semibold">{(factor.score * 100).toFixed(0)}%</span>
                                                <span className="text-gray-400 text-sm">({(factor.weight * 100).toFixed(0)}% weight)</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-6">
                        <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 transition-all transform hover:scale-105">
                            <Download className="w-5 h-5" />
                            <span>Export Clinical Report</span>
                        </button>
                        <button
                            onClick={resetDemo}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
                        >
                            Analyze Another Scan
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );



    if (currentView === 'upload') return <TrialUploadSection />;
    if (currentView === 'preview') return <TrialPreviewSection />;
    if (currentView === 'analysis') return <TrialAnalysisSection />;
    if (currentView === 'results') return <TrialResultsSection />;
    return <TrialUploadSection />;
}

export default TrialPage;