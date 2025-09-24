import { Brain, Activity, Radio, Globe, User } from 'lucide-react';

interface SidebarProps {
  onIconClick: (index: number, action: string) => void;
}

export function Sidebar({ onIconClick }: SidebarProps) {
  const icons = [
    { Icon: Brain, label: 'Neural', action: 'neural' },
    { Icon: Activity, label: 'Activity', action: 'activity' },
    { Icon: Radio, label: 'Stream', action: 'stream' },
    { Icon: Globe, label: 'Network', action: 'network' },
    { Icon: User, label: 'Contact', action: 'contact' }
  ];

  const handleIconClick = (index: number, action: string, event: React.MouseEvent) => {
    const target = event.currentTarget as HTMLElement;

    // Add click feedback
    target.style.transform = 'scale(0.9)';
    setTimeout(() => {
      target.style.transform = '';
    }, 150);

    onIconClick(index, action);
  };

  return (
    <div className="sidebar">
      {icons.map(({ Icon, label, action }, index) => (
        <div key={action} className="sidebar-item">
          <button
            className="sidebar-icon"
            title={label}
            onClick={(e) => handleIconClick(index, action, e)}
          >
            <Icon size={20} />
          </button>
          <div className="sidebar-label">{label}</div>
        </div>
      ))}
    </div>
  );
}