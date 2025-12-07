import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Item {
  id: number;
  name: string;
  price: number;
  category: string;
  status: 'available' | 'reserved' | 'sold';
  image: string;
  description: string;
}

const ELON_BUDGET = 440000000000;

const items: Item[] = [
  {
    id: 1,
    name: 'Tesla Roadster 2025',
    price: 200000,
    category: 'vehicles',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800',
    description: 'Супер-кар следующего поколения с ракетными двигателями'
  },
  {
    id: 2,
    name: 'SpaceX Starship Ticket',
    price: 250000,
    category: 'space',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800',
    description: 'Билет на орбиту Земли на борту Starship'
  },
  {
    id: 3,
    name: 'Tesla Cybertruck',
    price: 100000,
    category: 'vehicles',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800',
    description: 'Футуристичный электрический пикап из нержавеющей стали'
  },
  {
    id: 4,
    name: 'Starlink Satellite System',
    price: 500000,
    category: 'tech',
    status: 'reserved',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800',
    description: 'Персональная спутниковая система связи'
  },
  {
    id: 5,
    name: 'Tesla Powerwall',
    price: 15000,
    category: 'tech',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    description: 'Домашний аккумулятор для солнечной энергии'
  },
  {
    id: 6,
    name: 'Neuralink Brain Chip',
    price: 50000,
    category: 'tech',
    status: 'reserved',
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800',
    description: 'Нейроинтерфейс для связи мозга с компьютером'
  },
  {
    id: 7,
    name: 'Boring Company Flamethrower',
    price: 500,
    category: 'collectibles',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?w=800',
    description: 'Легендарный огнемёт Not-A-Flamethrower'
  },
  {
    id: 8,
    name: 'Mars Colony Spot',
    price: 10000000,
    category: 'space',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800',
    description: 'Место в первой колонии на Марсе'
  },
  {
    id: 9,
    name: 'Tesla Model S Plaid',
    price: 135000,
    category: 'vehicles',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800',
    description: 'Самый быстрый серийный электромобиль в мире'
  },
  {
    id: 10,
    name: 'Hyperloop Pod',
    price: 5000000,
    category: 'tech',
    status: 'sold',
    image: 'https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800',
    description: 'Капсула для путешествий на сверхзвуковых скоростях'
  },
  {
    id: 11,
    name: 'Tesla Solar Roof',
    price: 75000,
    category: 'tech',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800',
    description: 'Солнечная крыша со встроенными панелями'
  },
  {
    id: 12,
    name: 'SpaceX Dragon Capsule',
    price: 20000000,
    category: 'space',
    status: 'reserved',
    image: 'https://images.unsplash.com/photo-1541873676-a18131494184?w=800',
    description: 'Частная космическая капсула Dragon 2'
  }
];

const Index = () => {
  const [cart, setCart] = useState<Item[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const playSound = (type: 'add' | 'remove') => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'add') {
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(783.99, audioContext.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } else {
      oscillator.frequency.setValueAtTime(392.00, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(261.63, audioContext.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    }
  };

  const addToCart = (item: Item) => {
    if (item.status === 'sold') {
      toast.error('Этот лот уже продан');
      return;
    }
    if (item.status === 'reserved') {
      toast.error('Этот лот зарезервирован');
      return;
    }
    if (cart.find(i => i.id === item.id)) {
      toast.error('Этот лот уже в корзине');
      return;
    }
    playSound('add');
    setCart([...cart, item]);
    toast.success('Добавлено в корзину!');
  };

  const removeFromCart = (id: number) => {
    playSound('remove');
    setCart(cart.filter(item => item.id !== id));
    toast.success('Удалено из корзины');
  };

  const totalSpent = cart.reduce((sum, item) => sum + item.price, 0);
  const remainingBudget = ELON_BUDGET - totalSpent;
  const spentPercentage = (totalSpent / ELON_BUDGET) * 100;

  const filteredItems = items.filter(item => {
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    if (priceFilter === 'low' && item.price >= 100000) return false;
    if (priceFilter === 'medium' && (item.price < 100000 || item.price >= 1000000)) return false;
    if (priceFilter === 'high' && item.price < 1000000) return false;
    return true;
  });

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(num);
  };

  const statusBadgeColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-primary/20 text-primary border-primary/30';
      case 'reserved': return 'bg-accent/20 text-accent border-accent/30';
      case 'sold': return 'bg-muted text-muted-foreground border-muted-foreground/30';
      default: return '';
    }
  };

  const statusText = (status: string) => {
    switch (status) {
      case 'available': return 'Доступно';
      case 'reserved': return 'Резерв';
      case 'sold': return 'Продано';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-50" />
      
      <header className="border-b border-border/50 backdrop-blur-xl bg-background/80 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Icon name="Rocket" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">Spend Elon's Money</h1>
                <p className="text-xs text-muted-foreground">Реальные лоты с реальными ценами</p>
              </div>
            </div>
            
            <Button 
              onClick={() => setActiveTab('cart')}
              className="relative bg-primary hover:bg-primary/90"
            >
              <Icon name="ShoppingCart" size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full text-xs flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="gradient-border mb-4">
            <Card className="gradient-border-content p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Бюджет Илона Маска</h3>
                  <p className="text-3xl font-bold font-mono-numbers gradient-text">
                    {formatNumber(ELON_BUDGET)}
                  </p>
                </div>
                <Icon name="DollarSign" size={48} className="text-primary opacity-20" />
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Потрачено</span>
                    <span className="font-mono-numbers font-semibold text-accent">
                      {formatNumber(totalSpent)}
                    </span>
                  </div>
                  <div className="h-3 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${Math.min(spentPercentage, 100)}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Осталось</span>
                  <span className="font-mono-numbers font-semibold text-primary">
                    {formatNumber(remainingBudget)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-card border border-border">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Store" size={18} className="mr-2" />
              Все лоты
            </TabsTrigger>
            <TabsTrigger value="cart" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="ShoppingBag" size={18} className="mr-2" />
              Корзина ({cart.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Поиск лотов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-background"
                  />
                </div>
                
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-[180px] bg-background">
                    <SelectValue placeholder="Категория" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    <SelectItem value="vehicles">Автомобили</SelectItem>
                    <SelectItem value="space">Космос</SelectItem>
                    <SelectItem value="tech">Технологии</SelectItem>
                    <SelectItem value="collectibles">Коллекция</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-full md:w-[180px] bg-background">
                    <SelectValue placeholder="Цена" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Любая цена</SelectItem>
                    <SelectItem value="low">&lt; $100K</SelectItem>
                    <SelectItem value="medium">$100K - $1M</SelectItem>
                    <SelectItem value="high">&gt; $1M</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-[180px] bg-background">
                    <SelectValue placeholder="Статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="available">Доступно</SelectItem>
                    <SelectItem value="reserved">Резерв</SelectItem>
                    <SelectItem value="sold">Продано</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <Card 
                  key={item.id} 
                  className="overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={statusBadgeColor(item.status)}>
                        {statusText(item.status)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Цена</p>
                        <p className="text-xl font-bold font-mono-numbers text-primary">
                          {formatNumber(item.price)}
                        </p>
                      </div>
                      
                      <Button
                        onClick={() => addToCart(item)}
                        disabled={item.status !== 'available' || cart.find(i => i.id === item.id) !== undefined}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Icon name="Plus" size={18} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <Card className="p-12 text-center">
                <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Лоты не найдены</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cart" className="space-y-6">
            {cart.length === 0 ? (
              <Card className="p-12 text-center">
                <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
                <p className="text-muted-foreground mb-6">Добавьте лоты из каталога</p>
                <Button onClick={() => setActiveTab('all')} className="bg-primary hover:bg-primary/90">
                  <Icon name="Store" size={18} className="mr-2" />
                  Перейти к каталогу
                </Button>
              </Card>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold mb-1">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                          <p className="font-bold font-mono-numbers text-primary">
                            {formatNumber(item.price)}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="hover:bg-destructive/20 hover:text-destructive"
                        >
                          <Icon name="Trash2" size={18} />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg">
                      <span className="text-muted-foreground">Всего предметов:</span>
                      <span className="font-bold">{cart.length}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-muted-foreground">Итого:</span>
                      <span className="font-bold font-mono-numbers text-2xl gradient-text">
                        {formatNumber(totalSpent)}
                      </span>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <Button className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 h-12 text-lg">
                        <Icon name="CreditCard" size={20} className="mr-2" />
                        Оформить покупку
                      </Button>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <footer className="border-t border-border/50 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">
            Все цены реальные. Бюджет Илона Маска актуален на декабрь 2024.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;