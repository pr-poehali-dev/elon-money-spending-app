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
  },
  {
    id: 17,
    name: 'Lamborghini Aventador SVJ',
    price: 570000,
    category: 'cars',
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800',
    description: 'Итальянский суперкар с V12 мотором'
  },
  {
    id: 18,
    name: 'Pagani Huayra',
    price: 2800000,
    category: 'cars',
    image: 'https://images.unsplash.com/photo-1618843479619-f3d0d3f5c0e9?w=800',
    description: 'Эксклюзивный гиперкар ручной сборки'
  },
  {
    id: 19,
    name: 'Koenigsegg Jesko',
    price: 3400000,
    category: 'cars',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    description: 'Шведский гиперкар с 1600 л.с.'
  },
  {
    id: 20,
    name: 'Aston Martin Valkyrie',
    price: 3200000,
    category: 'cars',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    description: 'Гоночный гиперкар для дорог общего пользования'
  },
  {
    id: 21,
    name: 'Mercedes-Maybach Exelero',
    price: 8000000,
    category: 'cars',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800',
    description: 'Уникальное купе в единственном экземпляре'
  },
  {
    id: 22,
    name: 'Вилла на Лазурном берегу',
    price: 120000000,
    category: 'real-estate',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    description: 'Роскошная резиденция на Французской Ривьере'
  },
  {
    id: 23,
    name: 'Пентхаус в Дубае',
    price: 150000000,
    category: 'real-estate',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
    description: 'Апартаменты в самом высоком здании мира'
  },
  {
    id: 24,
    name: 'Ранчо в Техасе',
    price: 45000000,
    category: 'real-estate',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
    description: '50,000 акров земли с усадьбой'
  },
  {
    id: 25,
    name: 'Особняк в Беверли-Хиллз',
    price: 180000000,
    category: 'real-estate',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800',
    description: 'Голливудский особняк с 15 спальнями'
  },
  {
    id: 26,
    name: 'Горнолыжный курорт в Альпах',
    price: 250000000,
    category: 'real-estate',
    image: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=800',
    description: 'Частный курорт со склонами и отелем'
  },
  {
    id: 27,
    name: 'Boeing 747-8 VIP',
    price: 400000000,
    category: 'transport',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800',
    description: 'Частный лайнер с дворцовыми интерьерами'
  },
  {
    id: 28,
    name: 'Gulfstream G650ER',
    price: 70000000,
    category: 'transport',
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800',
    description: 'Самый быстрый бизнес-джет в мире'
  },
  {
    id: 29,
    name: 'Яхта Eclipse',
    price: 1500000000,
    category: 'transport',
    image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800',
    description: 'Суперяхта Романа Абрамовича с подлодкой'
  },
  {
    id: 30,
    name: 'Вертолёт Airbus H160',
    price: 15000000,
    category: 'transport',
    image: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=800',
    description: 'VIP вертолёт последнего поколения'
  },
  {
    id: 31,
    name: 'Подводная лодка Phoenix 1000',
    price: 80000000,
    category: 'transport',
    image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800',
    description: 'Частная подлодка с люкс-интерьерами'
  },
  {
    id: 32,
    name: 'NBA команда',
    price: 3000000000,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800',
    description: 'Баскетбольный клуб НБА'
  },
  {
    id: 33,
    name: 'Киностудия в Голливуде',
    price: 500000000,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800',
    description: 'Производство с павильонами и оборудованием'
  },
  {
    id: 34,
    name: 'Сеть роскошных отелей',
    price: 1200000000,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    description: '12 пятизвёздочных отелей по всему миру'
  },
  {
    id: 35,
    name: 'Технологический стартап',
    price: 800000000,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    description: 'AI-компания с 500 сотрудниками'
  },
  {
    id: 36,
    name: 'Роскошный курорт на Карибах',
    price: 350000000,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800',
    description: 'Частный курорт на 200 номеров'
  },
  {
    id: 37,
    name: 'Richard Mille RM 56-02',
    price: 2000000,
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=800',
    description: 'Часы из сапфира с турбийоном'
  },
  {
    id: 38,
    name: 'Jacob & Co Billionaire Watch',
    price: 18000000,
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800',
    description: 'Часы с 260 каратами бриллиантов'
  },
  {
    id: 39,
    name: 'Blue Moon Diamond',
    price: 48400000,
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=800',
    description: 'Голубой бриллиант 12.03 карата'
  },
  {
    id: 40,
    name: 'Hermès Birkin Himalaya',
    price: 500000,
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
    description: 'Самая дорогая сумка в мире'
  },
  {
    id: 41,
    name: 'Картина Леонардо да Винчи',
    price: 450000000,
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1580973112873-e6bf6e4d8b14?w=800',
    description: '«Спаситель мира», 1500 год'
  },
  {
    id: 42,
    name: 'Скрипка Страдивари',
    price: 16000000,
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800',
    description: '«Мессия» работы Антонио Страдивари'
  },
  {
    id: 43,
    name: 'Полёт на край космоса',
    price: 250000,
    category: 'experience',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    description: 'Суборбитальный полёт Blue Origin'
  },
  {
    id: 44,
    name: 'Путешествие на МКС',
    price: 55000000,
    category: 'experience',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800',
    description: '10 дней на Международной космической станции'
  },
  {
    id: 45,
    name: 'Экспедиция на Эверест',
    price: 150000,
    category: 'experience',
    image: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800',
    description: 'Восхождение с личным гидом и шерпами'
  },
  {
    id: 46,
    name: 'Сафари в Танзании VIP',
    price: 500000,
    category: 'experience',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800',
    description: 'Месяц в эксклюзивных лоджах с гидом'
  },
  {
    id: 47,
    name: 'Кругосветка на частной яхте',
    price: 5000000,
    category: 'experience',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    description: 'Год путешествия с командой и шеф-поваром'
  },
  {
    id: 48,
    name: 'Концерт любимой группы у вас дома',
    price: 2000000,
    category: 'experience',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800',
    description: 'Частное выступление мировых звёзд'
  },
  {
    id: 49,
    name: 'Ужин с Мишленом 3* на 100 персон',
    price: 750000,
    category: 'experience',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    description: 'Шеф-повар готовит для вашего мероприятия'
  },
  {
    id: 50,
    name: 'Тренировка с олимпийским чемпионом',
    price: 100000,
    category: 'experience',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
    description: 'Месяц персональных тренировок'
  },
  {
    id: 51,
    name: 'Аренда Formula 1 на день',
    price: 300000,
    category: 'experience',
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800',
    description: 'Погоняйте болид на настоящей трассе'
  },
  {
    id: 52,
    name: 'Подводное путешествие на батискафе',
    price: 750000,
    category: 'experience',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    description: 'Спуск к Титанику на 4000 метров'
  },
  {
    id: 53,
    name: 'Bentley Mulsanne',
    price: 350000,
    category: 'cars',
    image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800',
    description: 'Британская роскошь на колёсах'
  },
  {
    id: 54,
    name: 'Porsche 918 Spyder',
    price: 1700000,
    category: 'cars',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    description: 'Гибридный суперкар из Германии'
  },
  {
    id: 55,
    name: 'McLaren Senna',
    price: 1200000,
    category: 'cars',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    description: 'Трековый монстр для дорог'
  },
  {
    id: 56,
    name: 'Остров в Карибском море',
    price: 75000000,
    category: 'real-estate',
    image: 'https://images.unsplash.com/photo-1589197331516-e4d6d1a1b515?w=800',
    description: 'Ваш райский уголок площадью 200 акров'
  },
  {
    id: 57,
    name: 'Дворец в Индии',
    price: 60000000,
    category: 'real-estate',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
    description: 'Махараджская резиденция XVIII века'
  },
  {
    id: 58,
    name: 'Гольф-клуб с полем',
    price: 90000000,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800',
    description: 'Элитный клуб с 18 лунками'
  },
  {
    id: 59,
    name: 'Модный дом',
    price: 650000000,
    category: 'business',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800',
    description: 'Бренд класса Hermès или Gucci'
  },
  {
    id: 60,
    name: 'Редкий метеорит 50 кг',
    price: 2500000,
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800',
    description: 'Железный метеорит с паспортом'
  },
  {
    id: 61,
    name: 'Коллекция вин Château Lafite',
    price: 8000000,
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800',
    description: '100 бутылок редких винтажей'
  },
  {
    id: 62,
    name: 'Личный концерт Beyoncé',
    price: 6000000,
    category: 'experience',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    description: 'Приватное шоу на вашем празднике'
  },
  {
    id: 63,
    name: 'Путешествие в Антарктиду',
    price: 120000,
    category: 'experience',
    image: 'https://images.unsplash.com/photo-1518559681403-7c6cc0d90a04?w=800',
    description: 'Экспедиция на ледокольном судне'
  },
  {
    id: 64,
    name: 'Hennessey Venom F5',
    price: 2100000,
    category: 'cars',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    description: 'Американский гиперкар 500+ км/ч'
  },
  {
    id: 65,
    name: 'Золотой унитаз',
    price: 6000000,
    category: 'luxury',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800',
    description: 'Из 18-каратного золота, как у Маурицио Каттелана'
  },
  {
    id: 66,
    name: 'Частный поезд "Orient Express"',
    price: 250000000,
    category: 'transport',
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800',
    description: 'Легендарный состав с 7 вагонами'
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