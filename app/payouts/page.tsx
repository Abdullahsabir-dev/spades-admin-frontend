// 'use client'

// import React, { useState } from 'react'
// import { Download, Calendar, X, Search, Filter, MoreVertical } from 'lucide-react'
// import { AdminLayout } from '@/components/admin-layout'
// import { Button } from '@/components/ui/button'
// import { mockPayouts, mockOutstandingPayouts } from '@/lib/mock-data'

// export default function PayoutsPage() {
//   const [activeTab, setActiveTab] = useState('Owed')
//   const [isCalendarOpen, setIsCalendarOpen] = useState(false)
//   const [selectedRange, setSelectedRange] = useState<string | null>('Mar 27, 2026 – Jul 6, 2026')

//   const tabs = [
//     { icon: '💸', label: 'Owed' },
//     { icon: '🏆', label: 'Overview' },
//     { icon: '💳', label: 'Methods' },
//     { icon: '🛡️', label: 'Verification' },
//     { icon: '⏱️', label: 'Tracker' },
//     { icon: '🎁', label: 'Claims' },
//     { icon: '📄', label: 'Tax' },
//     { icon: '⚖️', label: 'Disputes' },
//     { icon: '📜', label: 'History' },
//     { icon: '🔗', label: 'Crypto' },
//     { icon: '📦', label: 'Merch' },
//     { icon: '🤝', label: 'Sponsors' },
//     { icon: '🔒', label: 'Security' },
//     { icon: '🌐', label: 'Locale' },
//     { icon: '⚙️', label: 'Admin' },
//   ]

//   const currentMonthDays = Array.from({ length: 30 }, (_, i) => i + 1)
//   const nextMonthDays = Array.from({ length: 31 }, (_, i) => i + 1)

//   return (
//     <AdminLayout
//       title="Payouts — Admin Control Center"
//       subtitle="Internal admin view for managing, approving, and auditing tournament payouts. Players have a separate Payouts dashboard in their portal."
//     >
//       {/* Overview Cards - Always Visible */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
//         {mockPayouts.map((payout, idx) => (
//           <div
//             key={idx}
//             className={`bg-card border ${payout.color || 'border-border'} rounded-lg p-6`}
//           >
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-xs text-muted-foreground mb-2">{payout.title}</p>
//                 <p className="text-2xl font-bold text-white mb-1">{payout.value}</p>
//                 <p className="text-xs text-muted-foreground">{payout.subtitle}</p>
//               </div>
//               <div className="text-2xl">{payout.icon}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Date Range & Tabs - Always Visible */}
//       <div className="bg-card border border-border rounded-lg p-6 mb-6 relative">
//         <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
//               <Calendar className="w-4 h-4 text-muted-foreground" /> Date Range
//             </h3>
//             <p className="text-xs text-muted-foreground">Filter outstanding payouts and transaction history by date.</p>
//           </div>
//           <div className="flex flex-wrap items-center gap-2 relative">
//             <Button variant="outline" className="border-border text-foreground text-xs">Last 7d</Button>
//             <Button variant="outline" className="border-border text-foreground text-xs">Last 30d</Button>
//             <Button variant="outline" className="border-border text-foreground text-xs">Last 90d</Button>
            
//             <Button 
//               variant="outline" 
//               onClick={() => setIsCalendarOpen(!isCalendarOpen)}
//               className={`border-border text-xs ${selectedRange ? 'text-white font-medium bg-secondary' : 'text-muted-foreground'}`}
//             >
//               📅 {selectedRange ? selectedRange : 'Pick a date range'}
//             </Button>

//             {selectedRange && (
//               <Button 
//                 variant="ghost" 
//                 size="sm" 
//                 onClick={() => setSelectedRange(null)} 
//                 className="text-muted-foreground p-1 h-auto hover:text-white"
//               >
//                 <X className="w-3.5 h-3.5" /> Clear
//               </Button>
//             )}

//             {isCalendarOpen && (
//               <div className="absolute right-0 top-11 z-50 bg-card border border-border rounded-xl shadow-2xl p-4 w-[550px] max-w-screen-md grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
//                 <div>
//                   <div className="flex items-center justify-between mb-3 px-1">
//                     <span className="text-xs font-semibold text-white">June 2026</span>
//                   </div>
//                   <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted-foreground mb-2">
//                     {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <span key={d}>{d}</span>)}
//                   </div>
//                   <div className="grid grid-cols-7 gap-1 text-center text-xs text-white">
//                     <span className="p-1"></span>
//                     {currentMonthDays.map(day => (
//                       <button 
//                         key={day} 
//                         onClick={() => {
//                           setSelectedRange(`Jun ${day}, 2026 – Jul 6, 2026`)
//                           setIsCalendarOpen(false)
//                         }}
//                         className={`p-1 rounded hover:bg-primary hover:text-primary-foreground ${day >= 14 && day <= 27 ? 'bg-primary/20 text-primary' : ''}`}
//                       >
//                         {day}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <div className="flex items-center justify-between mb-3 px-1">
//                     <span className="text-xs font-semibold text-white">July 2026</span>
//                   </div>
//                   <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted-foreground mb-2">
//                     {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <span key={d}>{d}</span>)}
//                   </div>
//                   <div className="grid grid-cols-7 gap-1 text-center text-xs text-white">
//                     <span className="p-1"></span><span className="p-1"></span><span className="p-1"></span>
//                     {nextMonthDays.map(day => (
//                       <button 
//                         key={day} 
//                         onClick={() => {
//                           setSelectedRange(`Jun 27, 2026 – Jul ${day}, 2026`)
//                           setIsCalendarOpen(false)
//                         }}
//                         className={`p-1 rounded hover:bg-primary hover:text-primary-foreground ${day <= 6 ? 'bg-primary/20 text-primary' : ''}`}
//                       >
//                         {day}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Global Hub Navigation Tabs */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-2 mt-6 pt-6 border-t border-border">
//           {tabs.map((tab) => {
//             const isActive = activeTab === tab.label
//             return (
//               <button
//                 key={tab.label}
//                 onClick={() => setActiveTab(tab.label)}
//                 className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
//                   isActive
//                     ? 'bg-secondary border-border text-white shadow-inner'
//                     : 'bg-card border-transparent text-muted-foreground hover:bg-secondary/40 hover:text-white'
//                 }`}
//               >
//                 <span>{tab.icon}</span>
//                 <span className="truncate">{tab.label}</span>
//               </button>
//             )
//           })}
//         </div>
//       </div>

//       {/* --- CONTENT CONTROLLER PANELS --- */}

//       {/* 1. OWED TAB */}
//       {activeTab === 'Owed' && (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//             <div className="bg-[#140d1b] border border-border rounded-lg p-6">
//               <p className="text-xs text-muted-foreground mb-2">Total Owed</p>
//               <p className="text-2xl font-bold text-white">$5,150</p>
//             </div>
//             <div className="bg-[#140d1b] border border-border rounded-lg p-6">
//               <p className="text-xs text-muted-foreground mb-2">Players Awaiting</p>
//               <p className="text-2xl font-bold text-white">6</p>
//             </div>
//             <div className="bg-[#140d1b] border border-border rounded-lg p-6">
//               <p className="text-xs text-muted-foreground mb-2">Ready to Send</p>
//               <p className="text-2xl font-bold text-white">$3,500</p>
//             </div>
//             <div className="bg-[#140d1b] border border-border rounded-lg p-6">
//               <p className="text-xs text-muted-foreground mb-2">Blocked</p>
//               <p className="text-2xl font-bold text-red-400">$1,650</p>
//             </div>
//           </div>

//           <div className="bg-[#140d1b] border border-border rounded-lg overflow-hidden">
//             <div className="flex items-center justify-between p-6 border-b border-border">
//               <h2 className="text-lg font-bold text-white">Outstanding Player Payouts</h2>
//               <div className="flex items-center gap-3">
//                 <Button variant="outline" className="border-border">
//                   <Download className="w-4 h-4 mr-2" /> Export
//                 </Button>
//                 <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
//                   Process Batch
//                 </Button>
//               </div>
//             </div>
//             <p className="px-6 py-2 text-xs text-muted-foreground">Every player currently owed money or rewards by the platform.</p>

//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-border bg-card">
//                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground">Player</th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground">Tournament</th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground">Placement</th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground">Amount</th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground">Method</th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground">Owed Since</th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground">Status</th>
//                     <th className="px-6 py-4 text-left text-xs font-medium text-muted-foreground">Blocker</th>
//                     <th className="px-6 py-4"></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {mockOutstandingPayouts.map((payout, idx) => (
//                     <tr key={idx} className="border-b border-border hover:bg-secondary/30 transition-colors">
//                       <td className="px-6 py-4">
//                         <div>
//                           <p className="text-sm font-medium text-white">{payout.player}</p>
//                           <p className="text-xs text-muted-foreground">{payout.email}</p>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-foreground">{payout.tournament}</td>
//                       <td className="px-6 py-4 text-sm text-foreground">{payout.placement}</td>
//                       <td className="px-6 py-4 text-sm text-primary font-medium">{payout.amount}</td>
//                       <td className="px-6 py-4 text-sm text-foreground">{payout.method}</td>
//                       <td className="px-6 py-4 text-sm text-muted-foreground">{payout.owedSince}</td>
//                       <td className="px-6 py-4">
//                         <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                           payout.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
//                           payout.status === 'approved' ? 'bg-green-500/20 text-green-400' :
//                           payout.status === 'pending-review' ? 'bg-orange-500/20 text-orange-400' :
//                           payout.status === 'kyc-needed' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
//                         }`}>
//                           {payout.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-muted-foreground">{payout.blocker || '—'}</td>
//                       <td className="px-6 py-4">
//                         <Button variant="ghost" size="sm" className="text-foreground">Review</Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       )}

//       {/* 2. OVERVIEW TAB */}
//       {activeTab === 'Overview' && (
//         <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//             <div>
//               <h2 className="text-xl font-bold text-white tracking-tight">Prize Distribution</h2>
//               <p className="text-xs text-zinc-400 mt-0.5">Winners, placements and payout status for the selected tournament.</p>
//             </div>
//             <div className="flex gap-2">
//               <select className="bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white px-3 py-2 outline-none cursor-pointer">
//                 <option>Spring Championship</option>
//               </select>
//               <select className="bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white px-3 py-2 outline-none cursor-pointer">
//                 <option>USD $</option>
//               </select>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full text-left border-collapse">
//               <thead>
//                 <tr className="border-b border-zinc-800 text-zinc-400 text-xs font-medium">
//                   <th className="pb-3 font-normal">Tournament</th>
//                   <th className="pb-3 font-normal">Winner Name</th>
//                   <th className="pb-3 font-normal">Placement</th>
//                   <th className="pb-3 font-normal">Reward</th>
//                   <th className="pb-3 font-normal">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="text-xs divide-y divide-zinc-900">
//                 {[
//                   { name: 'Ace_Spader', place: '1st', reward: '$5,000 + Trophy', badge: 'bg-amber-500 text-zinc-950 font-bold', label: 'Sent' },
//                   { name: 'QueenOfClubs', place: '2nd', reward: '$2,500', badge: 'bg-zinc-800 border border-zinc-700 text-zinc-200', label: 'Processing' },
//                   { name: 'JokerWild', place: '3rd', reward: '$1,000', badge: 'bg-zinc-900 border border-zinc-800 text-zinc-300', label: 'Approved' },
//                   { name: 'DiamondKing', place: '4th', reward: '$200', badge: 'bg-zinc-900 text-zinc-400 border border-zinc-800', label: 'Pending Review' },
//                   { name: 'BluffMaster', place: '5th', reward: '$200', badge: 'bg-red-600 text-white font-bold', label: 'KYC Needed' }
//                 ].map((row, idx) => (
//                   <tr key={idx} className="text-zinc-300">
//                     <td className="py-4">Spring Championship</td>
//                     <td className="py-4 text-white font-medium">{row.name}</td>
//                     <td className="py-4">{row.place}</td>
//                     <td className="py-4 text-zinc-200">{row.reward}</td>
//                     <td className="py-4">
//                       <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${row.badge}`}>
//                         {row.label}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* 3. METHODS TAB */}
//       {activeTab === 'Methods' && (
//         <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
//           <h2 className="text-xl font-bold text-white tracking-tight">Payout Method Selection</h2>
//           <p className="text-xs text-zinc-400 mt-0.5 mb-6">Choose how rewards will be delivered.</p>
          
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {[
//               { type: 'Money', name: 'Stripe Connect', active: true },
//               { type: 'Money', name: 'Zelle' },
//               { type: 'Money', name: 'ACH / Bank' },
//               { type: 'Money', name: 'Venmo' },
//               { type: 'Money', name: 'Cash App' },
//               { type: 'Crypto', name: 'USDC' },
//               { type: 'Crypto', name: 'Bitcoin' },
//               { type: 'Crypto', name: 'Ethereum' },
//               { type: 'Crypto', name: 'Solana' },
//               { type: 'Merch Vendors', name: 'Printful' },
//               { type: 'Merch Vendors', name: 'Printify' },
//               { type: 'Merch Vendors', name: 'Gelato' }
//             ].map((method, idx) => (
//               <div 
//                 key={idx} 
//                 className={`bg-[#140d1b] border rounded-xl p-5 flex flex-col justify-between h-[140px] ${
//                   method.active ? 'border-amber-500/80' : 'border-zinc-800/60'
//                 }`}
//               >
//                 <div>
//                   <span className="text-[10px] text-zinc-500 uppercase font-semibold tracking-wider">{method.type}</span>
//                   <p className="text-sm font-semibold text-white mt-1">{method.name}</p>
//                 </div>
//                 <button className="bg-zinc-950 hover:bg-black border border-zinc-800 text-zinc-200 text-xs font-medium py-2 px-3 rounded-lg w-fit transition-colors">
//                   Connect {method.name}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* 4. VERIFICATION TAB */}
//       {activeTab === 'Verification' && (
//         <div>
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             {[
//               { label: 'Players Tracked', value: '7', color: 'text-white' },
//               { label: 'Fully Verified', value: '2', color: 'text-emerald-400' },
//               { label: 'Action Required', value: '5', color: 'text-amber-400' },
//               { label: 'Wallets Verified', value: '2', color: 'text-white' }
//             ].map((metric, i) => (
//               <div key={i} className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-5">
//                 <p className="text-xs text-zinc-400 font-medium">{metric.label}</p>
//                 <p className={`text-2xl font-bold mt-2 ${metric.color}`}>{metric.value}</p>
//               </div>
//             ))}
//           </div>

//           <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//               <div>
//                 <h2 className="text-lg font-bold text-white flex items-center gap-2">
//                   🛡️ Wallet & Identity Verification by Player
//                 </h2>
//                 <p className="text-xs text-zinc-400 mt-0.5">Per-player KYC, tax, wallet, and fraud status.</p>
//               </div>
//               <div className="relative max-w-xs w-full">
//                 <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
//                 <input 
//                   type="text" 
//                   placeholder="Search player..." 
//                   className="bg-zinc-900 text-xs text-white pl-9 pr-4 py-2 rounded-lg border border-zinc-800 w-full outline-none"
//                 />
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse text-xs">
//                 <thead>
//                   <tr className="border-b border-zinc-800 text-zinc-400 font-medium">
//                     <th className="pb-3 font-normal">Player</th>
//                     <th className="pb-3 font-normal">Country</th>
//                     <th className="pb-3 font-normal">Wallet</th>
//                     <th className="pb-3 text-center font-normal">KYC Verified</th>
//                     <th className="pb-3 text-center font-normal">Age (18+)</th>
//                     <th className="pb-3 text-center font-normal">Country Elig.</th>
//                     <th className="pb-3 text-center font-normal">Tax Info</th>
//                     <th className="pb-3 text-center font-normal">Wallet Verif.</th>
//                     <th className="pb-3 text-center font-normal">Fraud Risk</th>
//                     <th className="pb-3 text-center font-normal">Progress</th>
//                     <th className="pb-3 font-normal"></th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-zinc-900 text-zinc-300">
//                   {[
//                     { name: 'Ace_Spader', email: 'ace.s@example.com', country: 'US', wallet: '0x4f3a...8b21', checks: [true, true, true, true, true, true], progress: '6/6', action: 'View' },
//                     { name: 'QueenOfClubs', email: 'queen@example.com', country: 'US', wallet: '—', checks: [true, true, true, false, false, true], progress: '4/6', action: 'Request Info' },
//                     { name: 'JokerWild', email: 'joker@example.com', country: 'CA', wallet: '0x91bc...77ee', checks: [true, true, true, true, true, true], progress: '6/6', action: 'View' },
//                     { name: 'DiamondKing', email: 'dking@example.com', country: 'UK', wallet: '—', checks: [false, true, true, false, false, true], progress: '3/6', action: 'Request Info' },
//                     { name: 'BluffMaster', email: 'bluff@example.com', country: 'US', wallet: '—', checks: [false, true, true, false, false, false], progress: '2/6', action: 'Request Info' }
//                   ].map((row, idx) => (
//                     <tr key={idx} className="hover:bg-zinc-900/20">
//                       <td className="py-4">
//                         <div className="font-medium text-white">{row.name}</div>
//                         <div className="text-[11px] text-zinc-500 mt-0.5">{row.email}</div>
//                       </td>
//                       <td className="py-4">{row.country}</td>
//                       <td className="py-4 font-mono text-zinc-400">{row.wallet}</td>
//                       {row.checks.map((check, i) => (
//                         <td key={i} className="py-4 text-center">
//                           {check ? <span className="text-emerald-500 font-bold">✓</span> : <span className="text-red-500 font-bold">✕</span>}
//                         </td>
//                       ))}
//                       <td className="py-4 text-center">
//                         <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded font-semibold text-[10px]">{row.progress}</span>
//                       </td>
//                       <td className="py-4 text-right">
//                         <button className="bg-zinc-900 border border-zinc-800 text-zinc-200 px-2.5 py-1 rounded-md text-[11px] font-medium">{row.action}</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 5. TRACKER TAB */}
//       {activeTab === 'Tracker' && (
//         <div>
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             {['Active Payouts', 'In Processing', 'Completed', 'Awaiting Action'].map((lbl, idx) => (
//               <div key={idx} className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-5">
//                 <p className="text-xs text-zinc-400 font-medium">{lbl}</p>
//                 <p className="text-2xl font-bold mt-2 text-white">{idx === 0 ? '5' : idx === 3 ? '2' : '1'}</p>
//               </div>
//             ))}
//           </div>

//           <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6 space-y-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//               <div>
//                 <h2 className="text-lg font-bold text-white flex items-center gap-2">⏱️ Individual Payout Tracker</h2>
//                 <p className="text-xs text-zinc-400 mt-0.5">Track the progress of every player's payout in real time.</p>
//               </div>
//               <div className="flex gap-2 max-w-md w-full">
//                 <input type="text" placeholder="Search player or payout ID..." className="bg-zinc-900 text-xs text-white px-3 py-2 rounded-lg border border-zinc-800 w-full outline-none" />
//                 <select className="bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white px-3 py-2 outline-none"><option>All Statuses</option></select>
//               </div>
//             </div>

//             {/* Stepper Card 1 */}
//             <div className="bg-[#140d1b] border border-zinc-800/60 rounded-xl p-5">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm font-semibold text-white">Ace_Spader</span>
//                     <span className="text-[10px] text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded font-mono">PO-10301</span>
//                     <span className="bg-amber-500 text-zinc-950 px-2 py-0.2 rounded text-[10px] font-bold uppercase">Completed</span>
//                   </div>
//                   <p className="text-[11px] text-zinc-400 mt-1">ace.s@example.com • Spring Championship</p>
//                 </div>
//                 <div className="text-right"><p className="text-base font-bold text-white">$5,000</p><p className="text-[10px] text-zinc-500">Stripe Connect</p></div>
//               </div>

//               <div className="relative flex justify-between items-center max-w-3xl mx-auto py-4">
//                 <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 border-t border-dashed border-zinc-500 z-0"></div>
//                 {['Pending Review', 'Identity Verified', 'Approved', 'Processing', 'Sent', 'Completed'].map((step, idx) => (
//                   <div key={idx} className="relative z-10 flex flex-col items-center gap-1.5 text-center">
//                     <div className="w-5 h-5 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center text-[10px] font-bold">✓</div>
//                     <span className="text-[10px] text-zinc-400">{step}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="flex justify-between items-center border-t border-zinc-900 pt-4 mt-2 text-[11px] text-zinc-500">
//                 <span>⏳ Delivered 2026-05-22 • Ref: ch_3PQrSt9xY7K2vB1a</span>
//                 <div className="flex gap-2">
//                   <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded">View Details</button>
//                   <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded">Notify Player</button>
//                 </div>
//               </div>
//             </div>

//             {/* Stepper Card 2 */}
//             <div className="bg-[#140d1b] border border-zinc-800/60 rounded-xl p-5">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <div className="flex items-center gap-2">
//                     <span className="text-sm font-semibold text-white">QueenOfClubs</span>
//                     <span className="text-[10px] text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded font-mono">PO-10302</span>
//                     <span className="bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.2 rounded text-[10px]">Processing</span>
//                   </div>
//                   <p className="text-[11px] text-zinc-400 mt-1">queen@example.com • Spring Championship</p>
//                 </div>
//                 <div className="text-right"><p className="text-base font-bold text-white">$2,250</p><p className="text-[10px] text-zinc-500">Stripe Connect</p></div>
//               </div>

//               <div className="relative flex justify-between items-center max-w-3xl mx-auto py-4">
//                 <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-zinc-800 z-0"></div>
//                 {['Pending Review', 'Identity Verified', 'Approved', 'Processing', 'Sent', 'Completed'].map((step, idx) => {
//                   const isDone = idx <= 2; const isCurrent = idx === 3;
//                   return (
//                     <div key={idx} className="relative z-10 flex flex-col items-center gap-1.5 text-center">
//                       <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isDone ? 'bg-emerald-500 text-zinc-950 font-bold' : isCurrent ? 'bg-purple-500 text-white font-bold' : 'bg-zinc-800 text-zinc-500'}`}>{isDone ? '✓' : idx + 1}</div>
//                       <span className={`text-[10px] ${isDone || isCurrent ? 'text-zinc-300' : 'text-zinc-600'}`}>{step}</span>
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 6. CLAIMS TAB */}
//       {activeTab === 'Claims' && (
//         <div>
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             {[
//               { label: 'Pending Review', value: '7' },
//               { label: 'Approved Today', value: '12' },
//               { label: 'Declined Today', value: '2' },
//               { label: 'Avg. Review Time', value: '3.4h' }
//             ].map((card, idx) => (
//               <div key={idx} className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-5">
//                 <p className="text-xs text-zinc-400 font-medium">{card.label}</p>
//                 <p className="text-2xl font-bold mt-2 text-white">{card.value}</p>
//               </div>
//             ))}
//           </div>

//           <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//               <div>
//                 <h2 className="text-lg font-bold text-white flex items-center gap-2">🎁 Player Prize Claims</h2>
//                 <p className="text-xs text-zinc-400 mt-0.5">Review and approve or decline player-submitted prize claims.</p>
//               </div>
//               <select className="bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white px-3 py-2 outline-none"><option>Pending Review</option></select>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse text-xs">
//                 <thead>
//                   <tr className="border-b border-zinc-800 text-zinc-400 font-medium">
//                     <th className="pb-3 font-normal">Player</th>
//                     <th className="pb-3 font-normal">Tournament</th>
//                     <th className="pb-3 font-normal">Placement</th>
//                     <th className="pb-3 font-normal">Prize</th>
//                     <th className="pb-3 font-normal">Submitted</th>
//                     <th className="pb-3 font-normal">Terms</th>
//                     <th className="pb-3 font-normal">Shipping</th>
//                     <th className="pb-3 font-normal">Status</th>
//                     <th className="pb-3 text-right font-normal">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-zinc-900 text-zinc-300">
//                   {[
//                     { name: 'QueenOfClubs', tour: 'Spring Championship', place: '2nd', prize: '$2,500', date: '2026-05-26', terms: 'Accepted', ship: '—', status: 'Pending Review' },
//                     { name: 'JokerWild', tour: 'Spring Championship', place: '3rd', prize: '$1,000 + Hoodie', date: '2026-05-26', terms: 'Accepted', ship: 'Verified', status: 'Pending Review' },
//                     { name: 'DiamondKing', tour: 'Spring Championship', place: '4th', prize: '$200', date: '2026-05-25', terms: 'Accepted', ship: '—', status: 'Pending Review' },
//                     { name: 'AceHigh', tour: 'Weekly Showdown', place: '1st', prize: '$800 + Trophy', date: '2026-05-25', terms: 'Accepted', ship: 'Missing', status: 'Pending Review' },
//                     { name: 'BluffMaster', tour: 'Spring Championship', place: '5th', prize: '$200', date: '2026-05-24', terms: 'Missing', ship: '—', status: 'Pending Review' }
//                   ].map((row, idx) => (
//                     <tr key={idx} className="hover:bg-zinc-900/20">
//                       <td className="py-4 text-white font-medium">{row.name}</td>
//                       <td className="py-4">{row.tour}</td>
//                       <td className="py-4">{row.place}</td>
//                       <td className="py-4 text-white">{row.prize}</td>
//                       <td className="py-4 text-zinc-400">{row.date}</td>
//                       <td className="py-4">
//                         <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${row.terms === 'Accepted' ? 'bg-zinc-900 border border-zinc-800 text-zinc-300' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>{row.terms}</span>
//                       </td>
//                       <td className="py-4 text-zinc-400">{row.ship}</td>
//                       <td className="py-4"><span className="bg-zinc-900 border border-zinc-800 text-zinc-400 px-2.5 py-0.5 rounded-full font-medium">{row.status}</span></td>
//                       <td className="py-4 text-right space-x-1.5 whitespace-nowrap">
//                         <button className="bg-amber-500 text-zinc-950 font-bold px-3 py-1 rounded text-[11px]">Approve</button>
//                         <button className="bg-red-600 text-white font-medium px-3 py-1 rounded text-[11px]">Decline</button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 7. TAX TAB */}
//       {activeTab === 'Tax' && (
//         <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
//           <h2 className="text-xl font-bold text-white tracking-tight">Tax & Legal</h2>
//           <p className="text-xs text-zinc-400 mt-0.5 mb-6">1099 generated when annual winnings exceed $600.</p>
//           <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-center gap-3 mb-6">
//             <span className="text-amber-500 text-sm">⚠️</span>
//             <p className="text-xs text-amber-200">You are $120 away from the $600 reportable threshold. Upload W9 to continue receiving payouts.</p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <button className="bg-[#140d1b] border border-zinc-800 rounded-xl p-4 text-xs font-medium text-white py-3">📄 Upload W9</button>
//             <button className="bg-[#140d1b] border border-zinc-800 rounded-xl p-4 text-xs font-medium text-white py-3">📄 Upload W8-BEN</button>
//             <button className="bg-[#140d1b] border border-zinc-800 rounded-xl p-4 text-xs font-medium text-zinc-300 py-3">📥 Download 2025 1099</button>
//             <button className="bg-[#140d1b] border border-zinc-800 rounded-xl p-4 text-xs font-medium text-zinc-300 py-3">📄 Regional Compliance PDF</button>
//           </div>
//         </div>
//       )}

//       {/* 8. DISPUTES TAB */}
//       {activeTab === 'Disputes' && (
//         <div>
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             {[
//               { label: 'Open Cases', value: '3', color: 'text-white' },
//               { label: 'High/Critical Risk', value: '3', color: 'text-red-500' },
//               { label: 'Cleared', value: '1', color: 'text-emerald-400' },
//               { label: 'Disqualified', value: '1', color: 'text-white' }
//             ].map((card, idx) => (
//               <div key={idx} className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-5">
//                 <p className="text-xs text-zinc-400 font-medium">{card.label}</p>
//                 <p className={`text-2xl font-bold mt-2 ${card.color}`}>{card.value}</p>
//               </div>
//             ))}
//           </div>

//           <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//               <div>
//                 <h2 className="text-lg font-bold text-white flex items-center gap-2">🛡️ Anti-Cheat & Disputes by Player</h2>
//                 <p className="text-xs text-zinc-400 mt-0.5">Per-player fraud signals, appeals, and case resolution.</p>
//               </div>
//               <div className="flex gap-2 max-w-sm w-full">
//                 <input type="text" placeholder="Search player or case ID..." className="bg-zinc-900 text-xs text-white px-3 py-2 rounded-lg border border-zinc-800 w-full outline-none" />
//                 <select className="bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white px-3 py-2 outline-none"><option>Open</option></select>
//               </div>
//             </div>

//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse text-xs">
//                 <thead>
//                   <tr className="border-b border-zinc-800 text-zinc-400 font-medium">
//                     <th className="pb-3 font-normal">Case</th>
//                     <th className="pb-3 font-normal">Player</th>
//                     <th className="pb-3 font-normal">Match / Tournament</th>
//                     <th className="pb-3 font-normal">Reason</th>
//                     <th className="pb-3 font-normal">Risk</th>
//                     <th className="pb-3 font-normal">Filed</th>
//                     <th className="pb-3 font-normal">Status</th>
//                     <th className="pb-3 text-right font-normal">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-zinc-900 text-zinc-300">
//                   <tr className="hover:bg-zinc-900/20">
//                     <td className="py-4 font-mono text-zinc-400">DSP-4471</td>
//                     <td className="py-4"><div className="font-medium text-white">BluffMaster</div><div className="text-[11px] text-zinc-500">bluff@example.com</div></td>
//                     <td className="py-4"><div className="font-medium text-zinc-300">Match #4471</div><div className="text-[11px] text-zinc-500">Spring Championship</div></td>
//                     <td className="py-4 text-zinc-300">Suspicious bidding pattern</td>
//                     <td className="py-4"><span className="bg-orange-500 text-zinc-950 font-bold px-2 py-0.5 rounded text-[10px]">High</span></td>
//                     <td className="py-4 text-zinc-400">2026-05-26</td>
//                     <td className="py-4"><span className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-0.5 rounded">Under Review</span></td>
//                     <td className="py-4 text-right space-x-1.5 whitespace-nowrap">
//                       <button className="bg-amber-500 text-zinc-950 font-bold px-3 py-1 rounded text-[11px]">Clear</button>
//                       <button className="bg-red-600 text-white font-medium px-3 py-1 rounded text-[11px]">Disqualify</button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* 9. HISTORY TAB */}
//       {activeTab === 'History' && (
//         <div>
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             {[
//               { label: 'Players', value: '8' },
//               { label: 'Transactions', value: '8' },
//               { label: 'Total Paid', value: '$7,850', color: 'text-emerald-400' },
//               { label: 'Refunded', value: '$2,575', color: 'text-red-500' }
//             ].map((card, idx) => (
//               <div key={idx} className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-5">
//                 <p className="text-xs text-zinc-400 font-medium">{card.label}</p>
//                 <p className={`text-2xl font-bold mt-2 ${card.color || 'text-white'}`}>{card.value}</p>
//               </div>
//             ))}
//           </div>

//           <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//               <div>
//                 <h2 className="text-lg font-bold text-white flex items-center gap-2">⏱️ Transaction History by Player</h2>
//                 <p className="text-xs text-zinc-400 mt-0.5">Per-player lifetime winnings, withdrawals, and refunds.</p>
//               </div>
//               <div className="flex items-center gap-2 max-w-md w-full sm:justify-end">
//                 <button className="bg-[#7c3aed] text-white text-xs font-semibold px-3 py-2 rounded-lg flex items-center gap-1.5">📥 CSV</button>
//                 <button className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-medium px-3 py-2 rounded-lg flex items-center gap-1.5">📥 PDF</button>
//               </div>
//             </div>

//             <div className="space-y-4">
//               {[
//                 { name: 'AceHigh', email: 'ace@example.com', total: '$800', txns: '1 txn', id: 'PO-10288', date: '2026-05-18', tour: 'Weekly Showdown', amount: '$800', method: 'USDC', status: 'Completed' },
//                 { name: 'Ace_Spader', email: 'ace.s@example.com', total: '$5,000', txns: '1 txn', id: 'PO-10255', date: '2026-05-12', tour: 'Spring Championship', amount: '$5,000', method: 'Stripe Connect', status: 'Completed' }
//               ].map((group, i) => (
//                 <div key={i} className="bg-[#140d1b] border border-zinc-800/60 rounded-xl overflow-hidden">
//                   <div className="flex justify-between items-center p-4 bg-zinc-900/30 border-b border-zinc-900">
//                     <div><span className="text-sm font-semibold text-white">{group.name}</span><span className="text-xs text-zinc-500 ml-2">{group.email}</span></div>
//                     <div className="text-right"><span className="text-sm font-bold text-emerald-400">{group.total}</span><span className="text-[10px] text-zinc-500 block">{group.txns}</span></div>
//                   </div>
//                   <div className="p-4 overflow-x-auto">
//                     <table className="w-full text-left text-xs border-collapse">
//                       <thead>
//                         <tr className="text-zinc-500 border-b border-zinc-900">
//                           <th className="pb-2 font-normal">ID</th>
//                           <th className="pb-2 font-normal">Date</th>
//                           <th className="pb-2 font-normal">Tournament</th>
//                           <th className="pb-2 font-normal">Amount</th>
//                           <th className="pb-2 font-normal">Method</th>
//                           <th className="pb-2 font-normal">Status</th>
//                           <th className="pb-2 text-right font-normal">Action</th>
//                         </tr>
//                       </thead>
//                       <tbody className="text-zinc-300">
//                         <tr>
//                           <td className="py-3 font-mono text-zinc-400">{group.id}</td>
//                           <td className="py-3 text-zinc-400">{group.date}</td>
//                           <td className="py-3 font-medium text-white">{group.tour}</td>
//                           <td className="py-3">{group.amount}</td>
//                           <td className="py-3">{group.method}</td>
//                           <td className="py-3"><span className="bg-amber-500 text-zinc-950 font-bold px-2 py-0.5 rounded text-[10px]">{group.status}</span></td>
//                           <td className="py-3 text-right"><button className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded text-[11px]">Receipt</button></td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Framework placeholders for secondary config tabs */}
//       {activeTab !== 'Owed' && activeTab !== 'Overview' && activeTab !== 'Methods' && activeTab !== 'Verification' && activeTab !== 'Tracker' && activeTab !== 'Claims' && activeTab !== 'Tax' && activeTab !== 'Disputes' && activeTab !== 'History' && (
//         <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-12 text-center text-sm text-zinc-400">
//           {activeTab} content view initialized inside global panel wrapper config.
//         </div>
//       )}
//     </AdminLayout>
//   )
// }




'use client'

import React, { useState } from 'react'
import { Download, Calendar, X, Search, Filter, MoreVertical, Plus, Trash2, Edit, Wallet } from 'lucide-react'
import { AdminLayout } from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { mockPayouts, mockOutstandingPayouts } from '@/lib/mock-data'

export default function PayoutsPage() {
  const [activeTab, setActiveTab] = useState('Owed')
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [selectedRange, setSelectedRange] = useState<string | null>('Mar 27, 2026 – Jul 6, 2026')

  const tabs = [
    { icon: '💸', label: 'Owed' },
    { icon: '🏆', label: 'Overview' },
    { icon: '💳', label: 'Methods' },
    { icon: '🛡️', label: 'Verification' },
    { icon: '⏱️', label: 'Tracker' },
    { icon: '🎁', label: 'Claims' },
    { icon: '📄', label: 'Tax' },
    { icon: '⚖️', label: 'Disputes' },
    { icon: '📜', label: 'History' },
    { icon: '🔗', label: 'Crypto' },
    { icon: '📦', label: 'Merch' },
    { icon: '🤝', label: 'Sponsors' },
    { icon: '🔒', label: 'Security' },
    { icon: '🌐', label: 'Locale' },
    { icon: '⚙️', label: 'Admin' },
  ]

  const currentMonthDays = Array.from({ length: 30 }, (_, i) => i + 1)
  const nextMonthDays = Array.from({ length: 31 }, (_, i) => i + 1)

  return (
    <AdminLayout
      title="Payouts — Admin Control Center"
      subtitle="Internal admin view for managing, approving, and auditing tournament payouts. Players have a separate Payouts dashboard in their portal."
    >
      {/* Overview Cards - Always Visible */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {mockPayouts.map((payout, idx) => (
          <div
            key={idx}
            className={`bg-card border ${payout.color || 'border-border'} rounded-lg p-6`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-2">{payout.title}</p>
                <p className="font-heading text-2xl font-bold text-white mb-1">{payout.value}</p>
                <p className="text-xs text-muted-foreground">{payout.subtitle}</p>
              </div>
              <div className="text-2xl">{payout.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Date Range & Tabs - Always Visible */}
      <div className="bg-card border border-border rounded-lg p-6 mb-6 relative">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" /> Date Range
            </h3>
            <p className="text-xs text-muted-foreground">Filter outstanding payouts and transaction history by date.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 relative">
            <Button variant="outline" className="border-border text-foreground text-xs">Last 7d</Button>
            <Button variant="outline" className="border-border text-foreground text-xs">Last 30d</Button>
            <Button variant="outline" className="border-border text-foreground text-xs">Last 90d</Button>
            
            <Button 
              variant="outline" 
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className={`border-border text-xs ${selectedRange ? 'text-white font-medium bg-secondary' : 'text-muted-foreground'}`}
            >
              📅 {selectedRange ? selectedRange : 'Pick a date range'}
            </Button>

            {selectedRange && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedRange(null)} 
                className="text-muted-foreground p-1 h-auto hover:text-white"
              >
                <X className="w-3.5 h-3.5" /> Clear
              </Button>
            )}

            {isCalendarOpen && (
              <div className="absolute right-0 top-11 z-50 bg-card border border-border rounded-xl shadow-2xl p-4 w-[550px] max-w-screen-md grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-xs font-semibold text-white">June 2026</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted-foreground mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <span key={d}>{d}</span>)}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs text-white">
                    <span className="p-1"></span>
                    {currentMonthDays.map(day => (
                      <button 
                        key={day} 
                        onClick={() => {
                          setSelectedRange(`Jun ${day}, 2026 – Jul 6, 2026`)
                          setIsCalendarOpen(false)
                        }}
                        className={`p-1 rounded hover:bg-primary hover:text-primary-foreground ${day >= 14 && day <= 27 ? 'bg-primary/20 text-primary' : ''}`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-xs font-semibold text-white">July 2026</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted-foreground mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <span key={d}>{d}</span>)}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs text-white">
                    <span className="p-1"></span><span className="p-1"></span><span className="p-1"></span>
                    {nextMonthDays.map(day => (
                      <button 
                        key={day} 
                        onClick={() => {
                          setSelectedRange(`Jun 27, 2026 – Jul ${day}, 2026`)
                          setIsCalendarOpen(false)
                        }}
                        className={`p-1 rounded hover:bg-primary hover:text-primary-foreground ${day <= 6 ? 'bg-primary/20 text-primary' : ''}`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Global Hub Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-2 mt-6 pt-6 border-t border-border">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.label
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  isActive
                    ? 'bg-secondary border-border text-white shadow-inner'
                    : 'bg-card border-transparent text-muted-foreground hover:bg-secondary/40 hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="truncate">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* --- CONTENT CONTROLLER PANELS --- */}

      {/* 1. OWED TAB */}
      {activeTab === 'Owed' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#140d1b] border border-border rounded-lg p-6">
              <p className="text-xs text-muted-foreground mb-2">Total Owed</p>
              <p className="font-heading text-2xl font-bold text-white">$5,150</p>
            </div>
            <div className="bg-[#140d1b] border border-border rounded-lg p-6">
              <p className="text-xs text-muted-foreground mb-2">Players Awaiting</p>
              <p className="font-heading text-2xl font-bold text-white">6</p>
            </div>
            <div className="bg-[#140d1b] border border-border rounded-lg p-6">
              <p className="text-xs text-muted-foreground mb-2">Ready to Send</p>
              <p className="font-heading text-2xl font-bold text-white">$3,500</p>
            </div>
            <div className="bg-[#140d1b] border border-border rounded-lg p-6">
              <p className="text-xs text-muted-foreground mb-2">Blocked</p>
              <p className="font-heading text-2xl font-bold text-red-400">$1,650</p>
            </div>
          </div>

          <div className="bg-[#140d1b] border border-border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-bold text-white">Outstanding Player Payouts</h2>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="border-border">
                  <Download className="w-4 h-4 mr-2" /> Export
                </Button>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Process Batch
                </Button>
              </div>
            </div>
            <p className="px-6 py-2 text-xs text-muted-foreground">Every player currently owed money or rewards by the platform.</p>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Player</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Tournament</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Placement</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Method</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Owed Since</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Blocker</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockOutstandingPayouts.map((payout, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-white">{payout.player}</p>
                          <p className="text-xs text-muted-foreground">{payout.email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{payout.tournament}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{payout.placement}</td>
                      <td className="px-6 py-4 text-sm text-primary font-medium">{payout.amount}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{payout.method}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{payout.owedSince}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          payout.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                          payout.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                          payout.status === 'pending-review' ? 'bg-orange-500/20 text-orange-400' :
                          payout.status === 'kyc-needed' ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {payout.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{payout.blocker || '—'}</td>
                      <td className="px-6 py-4">
                        <Button variant="ghost" size="sm" className="text-foreground">Review</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* 2. OVERVIEW TAB */}
      {activeTab === 'Overview' && (
        <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Prize Distribution</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Winners, placements and payout status for the selected tournament.</p>
            </div>
            <div className="flex gap-2">
              <select className="bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white px-3 py-2 outline-none cursor-pointer">
                <option>Spring Championship</option>
              </select>
              <select className="bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white px-3 py-2 outline-none cursor-pointer">
                <option>USD $</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-xs font-medium">
                  <th className="pb-3 font-normal">Tournament</th>
                  <th className="pb-3 font-normal">Winner Name</th>
                  <th className="pb-3 font-normal">Placement</th>
                  <th className="pb-3 font-normal">Reward</th>
                  <th className="pb-3 font-normal">Status</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-zinc-900">
                {[
                  { name: 'Ace_Spader', place: '1st', reward: '$5,000 + Trophy', badge: 'bg-amber-500 text-zinc-950 font-bold', label: 'Sent' },
                  { name: 'QueenOfClubs', place: '2nd', reward: '$2,500', badge: 'bg-zinc-800 border border-zinc-700 text-zinc-200', label: 'Processing' },
                  { name: 'JokerWild', place: '3rd', reward: '$1,000', badge: 'bg-zinc-900 border border-zinc-800 text-zinc-300', label: 'Approved' },
                  { name: 'DiamondKing', place: '4th', reward: '$200', badge: 'bg-zinc-900 text-zinc-400 border border-zinc-800', label: 'Pending Review' },
                  { name: 'BluffMaster', place: '5th', reward: '$200', badge: 'bg-red-600 text-white font-bold', label: 'KYC Needed' }
                ].map((row, idx) => (
                  <tr key={idx} className="text-zinc-300">
                    <td className="py-4">Spring Championship</td>
                    <td className="py-4 text-white font-medium">{row.name}</td>
                    <td className="py-4">{row.place}</td>
                    <td className="py-4 text-zinc-200">{row.reward}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider ${row.badge}`}>
                        {row.label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. METHODS TAB */}
      {activeTab === 'Methods' && (
        <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white tracking-tight">Payout Method Selection</h2>
          <p className="text-xs text-zinc-400 mt-0.5 mb-6">Choose how rewards will be delivered.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { type: 'Money', name: 'Stripe Connect', active: true },
              { type: 'Money', name: 'Zelle' },
              { type: 'Money', name: 'ACH / Bank' },
              { type: 'Money', name: 'Venmo' },
              { type: 'Money', name: 'Cash App' },
              { type: 'Crypto', name: 'USDC' },
              { type: 'Crypto', name: 'Bitcoin' },
              { type: 'Crypto', name: 'Ethereum' },
              { type: 'Crypto', name: 'Solana' },
              { type: 'Merch Vendors', name: 'Printful' },
              { type: 'Merch Vendors', name: 'Printify' },
              { type: 'Merch Vendors', name: 'Gelato' }
            ].map((method, idx) => (
              <div 
                key={idx} 
                className={`bg-[#140d1b] border rounded-xl p-5 flex flex-col justify-between h-[140px] ${
                  method.active ? 'border-amber-500/80' : 'border-zinc-800/60'
                }`}
              >
                <div>
                  <span className="text-[10px] text-zinc-500 uppercase font-semibold tracking-wider">{method.type}</span>
                  <p className="text-sm font-semibold text-white mt-1">{method.name}</p>
                </div>
                <button className="bg-zinc-950 hover:bg-black border border-zinc-800 text-zinc-200 text-xs font-medium py-2 px-3 rounded-lg w-fit transition-colors">
                  Connect {method.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. VERIFICATION TAB */}
      {activeTab === 'Verification' && (
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Players Tracked', value: '7', color: 'text-white' },
              { label: 'Fully Verified', value: '2', color: 'text-emerald-400' },
              { label: 'Action Required', value: '5', color: 'text-amber-400' },
              { label: 'Wallets Verified', value: '2', color: 'text-white' }
            ].map((metric, i) => (
              <div key={i} className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-5">
                <p className="text-xs text-zinc-400 font-medium">{metric.label}</p>
                <p className={`font-heading text-2xl font-bold mt-2 ${metric.color}`}>{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  🛡️ Wallet & Identity Verification by Player
                </h2>
                <p className="text-xs text-zinc-400 mt-0.5">Per-player KYC, tax, wallet, and fraud status.</p>
              </div>
              <div className="relative max-w-xs w-full">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Search player..." 
                  className="bg-zinc-900 text-xs text-white pl-9 pr-4 py-2 rounded-lg border border-zinc-800 w-full outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 font-medium">
                    <th className="pb-3 font-normal">Player</th>
                    <th className="pb-3 font-normal">Country</th>
                    <th className="pb-3 font-normal">Wallet</th>
                    <th className="pb-3 text-center font-normal">KYC Verified</th>
                    <th className="pb-3 text-center font-normal">Age (18+)</th>
                    <th className="pb-3 text-center font-normal">Country Elig.</th>
                    <th className="pb-3 text-center font-normal">Tax Info</th>
                    <th className="pb-3 text-center font-normal">Wallet Verif.</th>
                    <th className="pb-3 text-center font-normal">Fraud Risk</th>
                    <th className="pb-3 text-center font-normal">Progress</th>
                    <th className="pb-3 font-normal"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300">
                  {[
                    { name: 'Ace_Spader', email: 'ace.s@example.com', country: 'US', wallet: '0x4f3a...8b21', checks: [true, true, true, true, true, true], progress: '6/6', action: 'View' },
                    { name: 'QueenOfClubs', email: 'queen@example.com', country: 'US', wallet: '—', checks: [true, true, true, false, false, true], progress: '4/6', action: 'Request Info' },
                    { name: 'JokerWild', email: 'joker@example.com', country: 'CA', wallet: '0x91bc...77ee', checks: [true, true, true, true, true, true], progress: '6/6', action: 'View' },
                    { name: 'DiamondKing', email: 'dking@example.com', country: 'UK', wallet: '—', checks: [false, true, true, false, false, true], progress: '3/6', action: 'Request Info' },
                    { name: 'BluffMaster', email: 'bluff@example.com', country: 'US', wallet: '—', checks: [false, true, true, false, false, false], progress: '2/6', action: 'Request Info' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-zinc-900/20">
                      <td className="py-4">
                        <div className="font-medium text-white">{row.name}</div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">{row.email}</div>
                      </td>
                      <td className="py-4">{row.country}</td>
                      <td className="py-4 font-mono text-zinc-400">{row.wallet}</td>
                      {row.checks.map((check, i) => (
                        <td key={i} className="py-4 text-center">
                          {check ? <span className="text-emerald-500 font-bold">✓</span> : <span className="text-red-500 font-bold">✕</span>}
                        </td>
                      ))}
                      <td className="py-4 text-center">
                        <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded font-semibold text-[10px]">{row.progress}</span>
                      </td>
                      <td className="py-4 text-right">
                        <button className="bg-zinc-900 border border-zinc-800 text-zinc-200 px-2.5 py-1 rounded-md text-[11px] font-medium">{row.action}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. TRACKER TAB */}
      {activeTab === 'Tracker' && (
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {['Active Payouts', 'In Processing', 'Completed', 'Awaiting Action'].map((lbl, idx) => (
              <div key={idx} className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-5">
                <p className="text-xs text-zinc-400 font-medium">{lbl}</p>
                <p className="font-heading text-2xl font-bold mt-2 text-white">{idx === 0 ? '5' : idx === 3 ? '2' : '1'}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">⏱️ Individual Payout Tracker</h2>
                <p className="text-xs text-zinc-400 mt-0.5">Track the progress of every player's payout in real time.</p>
              </div>
              <div className="flex gap-2 max-w-md w-full">
                <input type="text" placeholder="Search player or payout ID..." className="bg-zinc-900 text-xs text-white px-3 py-2 rounded-lg border border-zinc-800 w-full outline-none" />
                <select className="bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white px-3 py-2 outline-none"><option>All Statuses</option></select>
              </div>
            </div>

            {/* Stepper Card 1 */}
            <div className="bg-[#140d1b] border border-zinc-800/60 rounded-xl p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">Ace_Spader</span>
                    <span className="text-[10px] text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded font-mono">PO-10301</span>
                    <span className="bg-amber-500 text-zinc-950 px-2 py-0.2 rounded text-[10px] font-bold uppercase">Completed</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">ace.s@example.com • Spring Championship</p>
                </div>
                <div className="text-right"><p className="text-base font-bold text-white">$5,000</p><p className="text-[10px] text-zinc-500">Stripe Connect</p></div>
              </div>

              <div className="relative flex justify-between items-center max-w-3xl mx-auto py-4">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 border-t border-dashed border-zinc-500 z-0"></div>
                {['Pending Review', 'Identity Verified', 'Approved', 'Processing', 'Sent', 'Completed'].map((step, idx) => (
                  <div key={idx} className="relative z-10 flex flex-col items-center gap-1.5 text-center">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center text-[10px] font-bold">✓</div>
                    <span className="text-[10px] text-zinc-400">{step}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center border-t border-zinc-900 pt-4 mt-2 text-[11px] text-zinc-500">
                <span>⏳ Delivered 2026-05-22 • Ref: ch_3PQrSt9xY7K2vB1a</span>
                <div className="flex gap-2">
                  <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded">View Details</button>
                  <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-3 py-1 rounded">Notify Player</button>
                </div>
              </div>
            </div>

            {/* Stepper Card 2 */}
            <div className="bg-[#140d1b] border border-zinc-800/60 rounded-xl p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">QueenOfClubs</span>
                    <span className="text-[10px] text-zinc-400 bg-zinc-800 px-1.5 py-0.5 rounded font-mono">PO-10302</span>
                    <span className="bg-zinc-800 text-zinc-300 border border-zinc-700 px-2 py-0.2 rounded text-[10px]">Processing</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1">queen@example.com • Spring Championship</p>
                </div>
                <div className="text-right"><p className="text-base font-bold text-white">$2,250</p><p className="text-[10px] text-zinc-500">Stripe Connect</p></div>
              </div>

              <div className="relative flex justify-between items-center max-w-3xl mx-auto py-4">
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-zinc-800 z-0"></div>
                {['Pending Review', 'Identity Verified', 'Approved', 'Processing', 'Sent', 'Completed'].map((step, idx) => {
                  const isDone = idx <= 2; const isCurrent = idx === 3;
                  return (
                    <div key={idx} className="relative z-10 flex flex-col items-center gap-1.5 text-center">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${isDone ? 'bg-emerald-500 text-zinc-950 font-bold' : isCurrent ? 'bg-purple-500 text-white font-bold' : 'bg-zinc-800 text-zinc-500'}`}>{isDone ? '✓' : idx + 1}</div>
                      <span className={`text-[10px] ${isDone || isCurrent ? 'text-zinc-300' : 'text-zinc-600'}`}>{step}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

     {/* 6. CLAIMS TAB */}
      {activeTab === 'Claims' && (
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Pending Review', value: '7' },
              { label: 'Approved Today', value: '12' },
              { label: 'Declined Today', value: '2' },
              { label: 'Avg. Review Time', value: '3.4h' }
            ].map((card, idx) => (
              <div key={idx} className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-5">
                <p className="text-xs text-zinc-400 font-medium">{card.label}</p>
                <p className="font-heading text-2xl font-bold mt-2 text-white">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">🎁 Player Prize Claims</h2>
                <p className="text-xs text-zinc-400 mt-0.5">Review and approve or decline player-submitted prize claims.</p>
              </div>
              <select className="bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white px-3 py-2 outline-none"><option>Pending Review</option></select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-zinc-800 text-zinc-400 font-medium">
                    <th className="pb-3 font-normal">Player</th>
                    <th className="pb-3 font-normal">Tournament</th>
                    <th className="pb-3 font-normal">Placement</th>
                    <th className="pb-3 font-normal">Prize</th>
                    <th className="pb-3 font-normal">Submitted</th>
                    <th className="pb-3 text-right font-normal">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900 text-zinc-300">
                  {[
                    { player: 'Ace_Spader', match: 'Spring Championship', rank: '1st', reward: '$5,000 + Trophy', date: '2026-06-24' },
                    { player: 'JokerWild', match: 'Summer Qualifier', rank: '3rd', reward: '$1,000', date: '2026-06-25' }
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-zinc-900/20">
                      <td className="py-4 font-medium text-white">{row.player}</td>
                      <td className="py-4 text-zinc-400">{row.match}</td>
                      <td className="py-4">{row.rank}</td>
                      <td className="py-4 text-zinc-200">{row.reward}</td>
                      <td className="py-4 text-zinc-500 font-mono">{row.date}</td>
                      <td className="py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline" className="border-zinc-800 text-xs h-7">Decline</Button>
                          <Button size="sm" className="bg-primary text-primary-foreground text-xs h-7">Approve</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 7. TAX TAB */}
      {activeTab === 'Tax' && (
        <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">📄 Tax & Compliance Documents</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Monitor and audit player tax document submissions (W-8BEN / W-9).</p>
            </div>
            <Button variant="outline" className="border-zinc-800 text-zinc-300 bg-zinc-900 hover:bg-zinc-800 text-xs">
              <Download className="w-4 h-4 mr-2" /> Export Tax Ledger
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 font-medium">
                  <th className="pb-3 font-normal">Player</th>
                  <th className="pb-3 font-normal">Form Type</th>
                  <th className="pb-3 font-normal">Tax Year</th>
                  <th className="pb-3 font-normal">Status</th>
                  <th className="pb-3 font-normal">Last Updated</th>
                  <th className="pb-3 text-right font-normal">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-zinc-300">
                {[
                  { name: 'Ace_Spader', type: 'W-9 (US)', year: '2026', status: 'Verified', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', date: '2026-04-12' },
                  { name: 'QueenOfClubs', type: 'W-8BEN (Non-US)', year: '2026', status: 'Pending Review', badge: 'bg-amber-500/10 text-amber-500 border-amber-500/20', date: '2026-06-18' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/10">
                    <td className="py-4 font-semibold text-white">{row.name}</td>
                    <td className="py-4 font-mono text-zinc-400">{row.type}</td>
                    <td className="py-4">{row.year}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-0.5 rounded border text-[10px] font-medium ${row.badge}`}>{row.status}</span>
                    </td>
                    <td className="py-4 text-zinc-500 font-mono">{row.date}</td>
                    <td className="py-4 text-right">
                      <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-white text-xs">View PDF</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 8. DISPUTES TAB */}
      {activeTab === 'Disputes' && (
        <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">⚖️ Payout & Prize Disputes</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Manage player escalation tickets regarding incorrect payouts or placement metrics.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 font-medium">
                  <th className="pb-3 font-normal">Ticket ID</th>
                  <th className="pb-3 font-normal">Player</th>
                  <th className="pb-3 font-normal">Issue Category</th>
                  <th className="pb-3 font-normal">Severity</th>
                  <th className="pb-3 font-normal">Status</th>
                  <th className="pb-3 text-right font-normal">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-zinc-300">
                {[
                  { id: 'DISP-9021', name: 'BluffMaster', issue: 'Incorrect Placement Reward Split', level: 'High', style: 'text-red-400 bg-red-500/10 border-red-500/20', status: 'Open' },
                  { id: 'DISP-8944', name: 'DiamondKing', issue: 'Stripe Gateway Missing Funds', level: 'Medium', style: 'text-amber-400 bg-amber-500/10 border-amber-500/20', status: 'In Progress' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/10">
                    <td className="py-4 font-mono font-medium text-zinc-400">{row.id}</td>
                    <td className="py-4 font-semibold text-white">{row.name}</td>
                    <td className="py-4 text-zinc-300">{row.issue}</td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-medium ${row.style}`}>{row.level}</span>
                    </td>
                    <td className="py-4 text-zinc-400">{row.status}</td>
                    <td className="py-4 text-right">
                      <Button variant="outline" size="sm" className="border-zinc-800 text-xs h-7">Resolve</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 9. HISTORY TAB */}
      {activeTab === 'History' && (
        <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">📜 Complete Payout History</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Audited archive of processed distribution transactions.</p>
            </div>
            <div className="relative max-w-xs w-full sm:w-64">
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Search past logs..." 
                className="bg-zinc-900 text-xs text-white pl-9 pr-4 py-2 rounded-lg border border-zinc-800 w-full outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 font-medium">
                  <th className="pb-3 font-normal">Transaction ID</th>
                  <th className="pb-3 font-normal">Player</th>
                  <th className="pb-3 font-normal">Amount</th>
                  <th className="pb-3 font-normal">Method</th>
                  <th className="pb-3 font-normal">Settled Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-zinc-300">
                {[
                  { tx: 'TXN-773109', name: 'Ace_Spader', amount: '$5,000.00', method: 'Stripe Connect', date: '2026-05-22' },
                  { tx: 'TXN-773108', name: 'JokerWild', amount: '$1,000.00', method: 'USDC Wallet', date: '2026-05-20' },
                  { tx: 'TXN-773107', name: 'QueenOfClubs', amount: '$2,500.00', method: 'ACH / Bank Transfer', date: '2026-05-19' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/10">
                    <td className="py-4 font-mono text-zinc-500">{row.tx}</td>
                    <td className="py-4 font-semibold text-white">{row.name}</td>
                    <td className="py-4 font-medium text-emerald-400">{row.amount}</td>
                    <td className="py-4 text-zinc-400">{row.method}</td>
                    <td className="py-4 text-zinc-500 font-mono">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 10. CRYPTO TAB */}
      {activeTab === 'Crypto' && (
        <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white tracking-tight">Escrow & Crypto Treasury</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Funds secured on-chain. Verifiable, trustless, automated.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <div className="bg-[#140d1b] border border-zinc-800/60 rounded-xl p-6 flex flex-col justify-between h-[180px]">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase font-semibold tracking-wider block mb-1">Treasury Wallet</span>
                <p className="font-mono text-sm text-zinc-300 font-medium">0xBJ5p4d35...A1b2C3d4</p>
                <p className="font-heading text-3xl font-bold text-white tracking-tight mt-3">142,890 USDC</p>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 w-fit px-2.5 py-1 rounded-md flex items-center gap-1.5 text-[10px] text-zinc-300 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Smart contract verified
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1.5 font-medium">Preferred receive currency</label>
                <select className="bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-white px-3 py-3 w-full outline-none cursor-pointer appearance-none">
                  <option>USDC (stable)</option>
                </select>
              </div>
              <div>
                <label className="text-[11px] text-zinc-400 block mb-1.5 font-medium">Network</label>
                <select className="bg-zinc-900/80 border border-zinc-800 rounded-lg text-xs text-white px-3 py-3 w-full outline-none cursor-pointer appearance-none">
                  <option>Polygon (est. $0.01 gas)</option>
                </select>
              </div>
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold text-xs py-5 rounded-lg flex items-center justify-center gap-2">
                <Wallet className="w-4 h-4" /> Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 11. MERCH TAB */}
      {activeTab === 'Merch' && (
        <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">📦 Merchandise Fulfillment</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Select a player to view their shipping address and chosen merchandise with variants.</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" className="border-zinc-800 text-zinc-300 text-xs bg-zinc-900 hover:bg-zinc-800">
                <Edit className="w-3.5 h-3.5 mr-2" /> Edit Address
              </Button>
              <Button className="bg-amber-500 hover:bg-amber-600 text-zinc-950 text-xs font-semibold">
                Create Shipment
              </Button>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1.5 font-medium">Player</label>
              <select className="bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-white px-3 py-3 w-full outline-none cursor-pointer">
                <option>Ace_Spader — ace.s@example.com</option>
              </select>
            </div>

            <div className="bg-[#140d1b] border border-zinc-800/60 rounded-xl p-5">
              <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-wider block mb-2">Shipping Address (Provided by Player)</span>
              <p className="text-sm font-bold text-white">Ace_Spader</p>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                742 Evergreen Terrace<br />
                Springfield, IL 62704<br />
                USA
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-white tracking-wide uppercase">Specified Merchandise (2)</h3>
              
              {/* Product 1 */}
              <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-5 flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Champion Trophy</p>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Tracking: 1Z999AA10123456784</p>
                  <div className="mt-4 w-[240px]">
                    <label className="text-[10px] text-zinc-500 uppercase font-semibold block mb-1">Engraving</label>
                    <select className="bg-zinc-900 border border-zinc-800 rounded-md text-xs text-zinc-300 px-2.5 py-1.5 w-full outline-none"><option>Custom Name</option></select>
                  </div>
                </div>
                <span className="bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 text-[10px] px-2.5 py-0.5 rounded-full font-medium">In Transit</span>
              </div>

              {/* Product 2 */}
              <div className="bg-zinc-900/30 border border-zinc-800/60 rounded-xl p-5 flex items-start justify-between">
                <div className="w-full">
                  <p className="text-sm font-semibold text-white">Champion Hoodie</p>
                  <div className="grid grid-cols-2 gap-4 mt-4 max-w-md">
                    <div>
                      <label className="text-[10px] text-zinc-500 uppercase font-semibold block mb-1">Size</label>
                      <select className="bg-zinc-900 border border-zinc-800 rounded-md text-xs text-zinc-300 px-2.5 py-1.5 w-full outline-none"><option>L</option></select>
                    </div>
                    <div>
                      <label className="text-[10px] text-zinc-500 uppercase font-semibold block mb-1">Color</label>
                      <select className="bg-zinc-900 border border-zinc-800 rounded-md text-xs text-zinc-300 px-2.5 py-1.5 w-full outline-none"><option>Purple</option></select>
                    </div>
                  </div>
                </div>
                <span className="bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] px-2.5 py-0.5 rounded-full font-medium">Pending</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 12. SPONSORS TAB */}
      {activeTab === 'Sponsors' && (
        <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">🤝 Sponsor Integration</h2>
              <p className="text-xs text-zinc-400 mt-0.5">Create, modify, and remove sponsors and their prize details.</p>
            </div>
            <Button className="bg-amber-500 hover:bg-amber-600 text-zinc-950 text-xs font-semibold">
              <Plus className="w-4 h-4 mr-1.5" /> Add Sponsor
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 font-medium">
                  <th className="pb-3 font-normal">Sponsor</th>
                  <th className="pb-3 font-normal">Prize</th>
                  <th className="pb-3 font-normal">Value</th>
                  <th className="pb-3 font-normal">Split / Type</th>
                  <th className="pb-3 font-normal">Contact</th>
                  <th className="pb-3 font-normal">Status</th>
                  <th className="pb-3 text-right font-normal">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-900 text-zinc-300">
                {[
                  { name: 'RedBull Esports', prize: '$2,000 bonus + branded swag', value: '$2,000', split: '10% affiliate', contact: 'partners@redbull.com', status: 'Active', statusStyle: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
                  { name: 'Logitech G', prize: 'Pro mouse + keyboard set', value: '$350', split: 'Promo codes', contact: 'esports@logitech.com', status: 'Active', statusStyle: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
                  { name: 'DraftKings', prize: '$500 free play credit', value: '$500', split: 'Sponsored payout', contact: 'biz@draftkings.com', status: 'Pending', statusStyle: 'bg-zinc-800 text-zinc-400 border-zinc-700/50' }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-zinc-900/10">
                    <td className="py-4 font-semibold text-white">{row.name}</td>
                    <td className="py-4 text-zinc-400">{row.prize}</td>
                    <td className="py-4 font-medium">{row.value}</td>
                    <td className="py-4"><span className="bg-zinc-900 border border-zinc-800 px-2 py-0.5 rounded font-mono text-[10px] text-zinc-300">{row.split}</span></td>
                    <td className="py-4 font-mono text-zinc-400">{row.contact}</td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded border text-[10px] font-medium ${row.statusStyle}`}>{row.status}</span>
                    </td>
                    <td className="py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button className="bg-zinc-900 border border-zinc-800 text-zinc-300 p-1.5 rounded-lg hover:bg-zinc-800"><Edit className="w-3.5 h-3.5" /></button>
                        <button className="bg-red-950/40 border border-red-900 text-red-400 p-1.5 rounded-lg hover:bg-red-900/50"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 13. SECURITY TAB */}
      {activeTab === 'Security' && (
        <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">🔒 Security</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Non-negotiable protections for withdrawals.</p>
          </div>

          <div className="space-y-3">
            {[
              'Two-factor authentication (2FA)',
              'Withdrawal confirmation by email',
              'Device & IP verification',
              'Session logging',
              'Withdrawal cooldown (24h after wallet change)',
              'Wallet whitelist'
            ].map((label, idx) => (
              <div key={idx} className="bg-zinc-900/20 border border-zinc-800/60 rounded-xl p-4 flex items-center justify-between">
                <span className="text-xs text-zinc-200 font-medium">{label}</span>
                {/* Visual Custom Switch Toggle */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked className="sr-only peer" />
                  <div className="w-9 h-5 bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-950 after:border-zinc-300 after:border after:rounded-full after:h-4 Festive after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 14. LOCALE TAB */}
      {activeTab === 'Locale' && (
        <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">🌐 Multi-Currency & Localization</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1.5 font-medium">Display currency</label>
              <select className="bg-[#140d1b] border border-zinc-800 rounded-lg text-xs text-white px-3 py-3 w-full outline-none cursor-pointer"><option>USD $</option></select>
            </div>
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1.5 font-medium">Language</label>
              <select className="bg-[#140d1b] border border-zinc-800 rounded-lg text-xs text-white px-3 py-3 w-full outline-none cursor-pointer"><option>English</option></select>
            </div>
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1.5 font-medium">Timezone</label>
              <select className="bg-[#140d1b] border border-zinc-800 rounded-lg text-xs text-white px-3 py-3 w-full outline-none cursor-pointer"><option>UTC</option></select>
            </div>
            <div>
              <label className="text-[11px] text-zinc-400 block mb-1.5 font-medium">Region restrictions</label>
              <div className="bg-[#140d1b] border border-zinc-800 rounded-lg text-xs text-zinc-400 px-3 py-3 w-full select-none">
                Blocked: WA, ID, MT (US)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 15. ADMIN TAB */}
      {activeTab === 'Admin' && (
        <div className="bg-[#140d1b] border border-zinc-800/80 rounded-xl p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">⚙️ Admin Controls</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Powerful tools — use with care.</p>
          </div>

          <div className="space-y-4">
            {/* Automatic Payout Switch */}
            <div className="bg-[bg-[#140d1b] border border-zinc-800/60 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-200 font-medium">Automatic payouts</p>
                <p className="text-[11px] text-zinc-500 mt-0.5">Process winners on tournament close</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-9 h-5 bg-zinc-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-950 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {/* Freeze Payouts Switch */}
            <div className="bg-red-950/10 border border-red-900/40 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-red-400 font-semibold">Freeze all payouts</p>
                <p className="text-[11px] text-red-500/80 mt-0.5">Emergency stop — blocks all withdrawals</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-9 h-5 bg-zinc-900/80 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-zinc-950 after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            {/* Grid Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {[
                'Manual payout override', 'Batch payouts',
                'Recalculate prize pool', 'Bulk export audit logs',
                'Sponsor-funded payout', 'Fraud flag queue'
              ].map((btnLabel, index) => (
                <button 
                  key={index} 
                  className="bg-[#140d1b] border border-zinc-800/80 hover:bg-zinc-800 text-zinc-300 text-xs font-medium py-3 px-4 rounded-xl transition-colors text-center"
                >
                  {btnLabel}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </AdminLayout>
  )
}