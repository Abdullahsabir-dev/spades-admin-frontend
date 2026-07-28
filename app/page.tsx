"use client";

import { useState } from "react";
import {
  Users,
  DollarSign,
  Gamepad2,
  TrendingUp,
  UserPlus,
  Trophy,
  AlertTriangle,
  LogIn,
  Zap,
  ArrowUpRight,
  Settings,
  type LucideIcon,
} from "lucide-react";
import { AdminLayout } from "@/components/admin-layout";
import { StatCard } from "@/components/stat-card";
import { StatusBadge, RoleBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import {
  mockDashboardStats,
  mockUsers,
  mockActivityLog,
} from "@/lib/mock-data";
import { winRateColor } from "@/lib/utils";
import { CreateUserModal } from "@/components/modals/create-user-modal";

const icons = {
  users: Users,
  "dollar-sign": DollarSign,
  gamepad2: Gamepad2,
  "trending-up": TrendingUp,
};

/** Each activity type gets its own icon and colour, as in the design. */
const activityConfig: Record<string, { icon: LucideIcon; className: string }> = {
  user_registered: {
    icon: UserPlus,
    className: "bg-emerald-500/10 text-emerald-400",
  },
  deposit: { icon: DollarSign, className: "bg-primary/10 text-primary" },
  tournament_win: { icon: Trophy, className: "bg-primary/10 text-primary" },
  failed_login: {
    icon: AlertTriangle,
    className: "bg-red-500/10 text-red-400",
  },
  admin_login: { icon: LogIn, className: "bg-purple-500/10 text-purple-400" },
  match_completed: { icon: Zap, className: "bg-blue-500/10 text-blue-400" },
  withdrawal: {
    icon: ArrowUpRight,
    className: "bg-orange-500/10 text-orange-400",
  },
  profile_update: {
    icon: Settings,
    className: "bg-muted/40 text-muted-foreground",
  },
};

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateUser = (data: any) => {
    console.log("New user data:", data);
    alert("User created successfully!");
  };

  return (
    <>
      <AdminLayout
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening with your users today."
      >
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mockDashboardStats.map((stat, idx) => (
            <StatCard
              key={idx}
              title={stat.title}
              value={stat.value}
              change={stat.change}
              icon={icons[stat.icon as keyof typeof icons]}
            />
          ))}
        </div>

        {/* Recent Users and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Users */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Recent Users</h2>
              <Button
                className="bg-primary hover:bg-primary/90 cursor-pointer text-primary-foreground flex items-center gap-2"
                onClick={() => setIsModalOpen(true)}
              >
                <UserPlus className="w-4 h-4" />
                Create User
              </Button>
            </div>
            <div className="bg-card border border-border rounded-lg overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      User
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Balance
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Games
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Win Rate
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Last Active
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.slice(0, 5).map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-border last:border-b-0 hover:bg-secondary/50"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-sm font-bold text-white">
                            {user.initials}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {user.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <StatusBadge status={user.status as any} />
                      </td>
                      <td className="px-4 py-4">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="px-4 py-4 text-sm text-primary">
                        {user.balance.toLocaleString()} tokens
                      </td>
                      <td className="px-4 py-4 text-sm text-foreground">
                        {user.games}
                      </td>
                      <td
                        className={`px-4 py-4 text-sm ${winRateColor(user.winRate)}`}
                      >
                        {user.winRate}%
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">
                        {user.lastActive}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-6 py-5 ">
                <h2 className="text-lg font-bold text-white">
                  Recent Activity
                </h2>
              </div>
              <div className=" max-h-96 overflow-y-auto">
                {mockActivityLog.slice(0, 5).map((activity) => {
                  const { icon: ActivityIcon, className: activityClassName } =
                    activityConfig[activity.type] ??
                    activityConfig.profile_update;

                  return (
                  <div
                    key={activity.id}
                    className="p-4 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${activityClassName}`}
                      >
                        <ActivityIcon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">
                          {activity.title}
                        </p>
                        {/* <p className="text-xs text-muted-foreground">{activity.description}</p> */}
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>

      <CreateUserModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleCreateUser}
      />
    </>
  );
}
