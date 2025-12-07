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
  image: string;
  description: string;
}

const items: Item[] = [
  {
    id: 1,
    name: 'Ferrari LaFerrari',
    price: 1500000,
    category: 'cars',
    image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800',
    description: 'Гибридный гиперкар с мощностью 963 л.с.'
  },
  {
    id: 2,
    name: 'Bugatti Chiron',
    price: 3000000,
    category: 'cars',
    image: 'https://images.unsplash.com/photo-1566023888731-0c4f56e91b08?w=800',
    description: 'Самый мощный серийный автомобиль в мире'
  },
  {
    id: 3,
    name: 'Rolls-Royce Phantom',
    price: 500000,
    category: 'cars',
    image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800',
    description: 'Вершина автомобильной роскоши'
  },
  {
    id: 4,
    name: 'Частный остров на Мальдивах',
    price: 50000000,
    category: 'real-estate',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    description: 'Собственный тропический рай'
  },
  {
    id: 5,
    name: 'Пентхаус в Нью-Йорке',
    price: 95000000,
    category: 'real-estate',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    description: 'Апартаменты на Манхэттене с видом на Центральный парк'
  },
  {
    id: 6,
    name: 'Замок во Франции',
    price: 30000000,
    category: 'real-estate',
    image: 'https://images.unsplash.com/photo-1549740425-5e9ed4d8cd34?w=800',
    description: 'Средневековый замок XII века'
  },
  {
    id: 7,
    name: 'Airbus A380 Private',
    price: 500000000,
    category: 'transport',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    description: 'Частный самолёт с королевской отделкой'
  },
  {
    id: 8,
    name: 'Суперяхта Azzam',
    price: 600000000,
    category: 'transport',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800',
    description: 'Самая большая частная яхта в мире (180м)'
  },
  {
    id: 9,
    name: 'Футбольный клуб',
    price: 2000000000,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800',
    description: 'Европейский клуб топ-лиги'
  },
  {
    id: 10,
    name: 'Patek Philippe Grandmaster',
    price: 31000000,
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1587836374062-d24b0e564bcf?w=800',
    description: 'Самые сложные наручные часы в мире'
  },
  {
    id: 11,
    name: 'Pink Star Diamond',
    price: 71000000,
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
    description: 'Розовый бриллиант 59.60 карат'
  },
  {
    id: 12,
    name: 'Картина Пикассо',
    price: 179000000,
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1577720643272-265f28b3016c?w=800',
    description: '«Алжирские женщины», 1955'
  },
  {
    id: 13,
    name: 'Космический туризм Virgin Galactic',
    price: 450000,
    category: 'experience',
    image: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800',
    description: 'Полёт в космос на 90 минут'
  },
  {
    id: 14,
    name: 'Аренда Эйфелевой башни',
    price: 1000000,
    category: 'experience',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800',
    description: 'Частное мероприятие на всю башню'
  },
  {
    id: 15,
    name: 'McLaren P1',
    price: 1350000,
    category: 'cars',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    description: 'Британский гибридный суперкар'
  },
  {
    id: 16,
    name: 'Винодельня в Тоскане',
    price: 25000000,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800',
    description: 'Виноградники с замком и производством'
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
    if (cart.find(i => i.id === item.id)) {
      toast.error('Уже в вашей корзине мечты');
      return;
    }
    playSound('add');
    setCart([...cart, item]);
    toast.success('Добавлено в корзину мечты!');
  };

  const removeFromCart = (id: number) => {
    playSound('remove');
    setCart(cart.filter(item => item.id !== id));
    toast.success('Удалено из корзины мечты');
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const filteredItems = items.filter(item => {
    if (searchQuery && !item.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (priceFilter === 'low' && item.price >= 10000000) return false;
    if (priceFilter === 'medium' && (item.price < 10000000 || item.price >= 100000000)) return false;
    if (priceFilter === 'high' && item.price < 100000000) return false;
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
                <h1 className="text-2xl font-bold gradient-text">Корзина Мечты</h1>
                <p className="text-xs text-muted-foreground">Соберите свой список желаний миллиардера</p>
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
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm text-muted-foreground mb-1">Стоимость ваших мечтаний</h3>
                  <p className="text-4xl font-bold font-mono-numbers gradient-text">
                    {formatNumber(totalPrice)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {cart.length} {cart.length === 1 ? 'предмет' : cart.length < 5 ? 'предмета' : 'предметов'} в корзине
                  </p>
                </div>
                <div className="text-right">
                  <Icon name="TrendingUp" size={48} className="text-primary opacity-20" />
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
                    <SelectItem value="cars">Автомобили</SelectItem>
                    <SelectItem value="real-estate">Недвижимость</SelectItem>
                    <SelectItem value="transport">Транспорт</SelectItem>
                    <SelectItem value="business">Бизнес</SelectItem>
                    <SelectItem value="luxury">Люкс</SelectItem>
                    <SelectItem value="experience">Впечатления</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-full md:w-[180px] bg-background">
                    <SelectValue placeholder="Цена" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Любая цена</SelectItem>
                    <SelectItem value="low">&lt; $10M</SelectItem>
                    <SelectItem value="medium">$10M - $100M</SelectItem>
                    <SelectItem value="high">&gt; $100M</SelectItem>
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
                        disabled={cart.find(i => i.id === item.id) !== undefined}
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
                <h3 className="text-xl font-semibold mb-2">Корзина мечты пуста</h3>
                <p className="text-muted-foreground mb-6">Начните собирать список желаний</p>
                <Button onClick={() => setActiveTab('all')} className="bg-primary hover:bg-primary/90">
                  <Icon name="Sparkles" size={18} className="mr-2" />
                  К каталогу мечты
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
                      <span className="text-muted-foreground">Итоговая стоимость:</span>
                      <span className="font-bold font-mono-numbers text-2xl gradient-text">
                        {formatNumber(totalPrice)}
                      </span>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="text-center space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Для осуществления вашей мечты потребуется:
                        </p>
                        <p className="text-3xl font-bold gradient-text font-mono-numbers">
                          {formatNumber(totalPrice)}
                        </p>
                      </div>
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
            Все цены реальные и актуальны на декабрь 2024. Мечтайте смело! 💎
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;