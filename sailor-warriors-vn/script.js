'use strict';

const SAVE_KEY = 'sailor-warriors-black-heart-save-v1';
const imageBasePath = 'assets/images/';

const characters = {
  Narrator: { name: 'Рассказчик', role: 'Голос истории', imagePrefix: null, pitch: 1.0, rate: 0.95 },
  Student1: { name: 'Студент 1', role: 'Студент БГУ', imagePrefix: null, pitch: 1.0, rate: 1.0 },
  Student2: { name: 'Студентка 2', role: 'Студентка БГУ', imagePrefix: null, pitch: 1.1, rate: 1.0 },
  Shadow: { name: 'Тень', role: 'Внутренний страх', imagePrefix: null, pitch: 0.72, rate: 0.88 },
  All: { name: 'Все вместе', role: 'Команда', imagePrefix: null, pitch: 1.0, rate: 1.0 },
  Aleksey: {
    name: 'Алексей Олегович Ефремов', shortName: 'Алексей', role: 'Сейлор Мун',
    description: 'Лидер команды, добрый и заботливый, удерживает всех вместе.', imagePrefix: 'character_Aleksey', pitch: 1.0, rate: 1.0
  },
  Alexander: {
    name: 'Александр Ефремов', shortName: 'Александр', role: 'Сейлор Меркурий',
    description: 'Умный, спокойный и вдумчивый, ищет слабое место артефакта.', imagePrefix: 'character_Alexander', pitch: 0.95, rate: 0.95
  },
  Marina: {
    name: 'Марина Онтоева', shortName: 'Марина', role: 'Луна',
    description: 'Мудрая и независимая, чувствует тёмную энергию и направляет команду.', imagePrefix: 'character_Marina', pitch: 1.1, rate: 0.9
  },
  Vlada: {
    name: 'Влада', shortName: 'Влада', role: 'Сейлор Юпитер',
    description: 'Сильная, решительная и верная, защищает друзей и студентов.', imagePrefix: 'character_Vlada', pitch: 0.9, rate: 0.95
  },
  Valeria: {
    name: 'Валерия', shortName: 'Валерия', role: 'Сейлор Марс',
    description: 'Энергичная, страстная, иногда конфликтная, но преданная друзьям.', imagePrefix: 'character_Valeria', pitch: 1.05, rate: 1.08
  },
  Yulia: {
    name: 'Юлия Мосичева', shortName: 'Юлия', role: 'Сейлор Венера',
    description: 'Весёлая, харизматичная и яркая, возвращает людям тепло.', imagePrefix: 'character_Yulia', pitch: 1.2, rate: 1.05
  },
  Bainov: {
    name: 'Баинов Александр', shortName: 'Баинов', role: 'Антагонист',
    description: 'Студент БГУ, нашёл Чёрное Сердце Ангары.', imagePrefix: 'character_Bainov', pitch: 0.75, rate: 0.9
  }
};

const playableCharacterIds = ['Aleksey', 'Alexander', 'Marina', 'Vlada', 'Valeria', 'Yulia'];

let storyData = [];

const fallbackStoryData = [
  {
    id: 'scene_1_bgu_morning', title: 'Утро в БГУ', backgroundClass: 'bg-bgu-morning',
    lines: [
      { speaker: 'Narrator', text: 'Весна в Иркутске выдалась холодной.\nНад Ангарой висел серый туман, а в коридорах Байкальского государственного университета было непривычно тихо.\nСтуденты шли на пары молча. Кто-то смотрел в телефон, кто-то просто в пол.\nКазалось, будто из университета постепенно исчезает жизнь.' },
      { speaker: 'Student1', text: '— Я не понимаю… Мне ничего не хочется. Даже домой идти лень.' },
      { speaker: 'Student2', text: '— Вчера все смеялись, а сегодня будто все чужие.' },
      { speaker: 'Aleksey', emotion: 'worried', text: '— Ребята, вы тоже это чувствуете? Здесь что-то не так.' },
      { speaker: 'Alexander', emotion: 'thinking', text: '— Это уже не первый случай. За последние дни слишком много людей резко стали апатичными.' },
      { speaker: 'Yulia', emotion: 'soft', text: '— Они будто потеряли радость.' },
      { speaker: 'Vlada', emotion: 'defense', text: '— Кто-то должен за этим стоять.' },
      { speaker: 'Valeria', emotion: 'angry', text: '— Если это кто-то сделал специально, я лично с ним поговорю.' },
      { speaker: 'Marina', emotion: 'mysterious', text: '— Не просто кто-то. Я чувствую тёмную энергию. Она где-то рядом.' },
      { type: 'choice', title: 'Что сделать?', choices: [
        { text: 'Осмотреть коридоры БГУ.', effects: { logic: 10 }, result: [
          { speaker: 'Alexander', emotion: 'thinking', text: '— Нужно искать закономерности. Где чаще всего людям становится плохо?' },
          { speaker: 'Marina', emotion: 'mysterious', text: '— Энергия тянется к актовому залу.' }
        ]},
        { text: 'Поговорить со студентами.', effects: { empathy: 10, teamBond: 5 }, result: [
          { speaker: 'Yulia', emotion: 'soft', text: '— Не бойтесь, мы просто хотим понять, что происходит.' },
          { speaker: 'Student2', text: '— Я видела Баинова… Он стоял рядом, когда ребята начали вести себя странно.' }
        ]},
        { text: 'Последовать за тёмной энергией.', effects: { courage: 10, justice: 5 }, result: [
          { speaker: 'Marina', emotion: 'mysterious', text: '— Осторожно. Эта сила не просто пугает людей. Она вытягивает из них чувства.' },
          { speaker: 'Valeria', emotion: 'confident', text: '— Значит, идём туда, где она сильнее всего.' }
        ]}
      ]}
    ]
  },
  {
    id: 'scene_2_first_suspicion', title: 'Первое подозрение', backgroundClass: 'bg-bgu-corridor',
    lines: [
      { speaker: 'Narrator', text: 'Команда видит Баинова Александра. Он стоит один, смотрит на студентов и держит в руке странный тёмный кулон.' },
      { speaker: 'Bainov', emotion: 'main', text: '— Забавно. Стоит забрать у людей пару эмоций — и они сразу становятся честнее.\n— Без радости. Без привязанности. Без лицемерной дружбы.' },
      { speaker: 'Aleksey', emotion: 'worried', text: '— Баинов? Что ты делаешь?' },
      { speaker: 'Bainov', emotion: 'dark', text: '— Наблюдаю. Вы ведь всегда вместе, да? Всегда такие правильные, дружные, светлые.' },
      { speaker: 'Yulia', emotion: 'soft', text: '— Саша, если тебе плохо, можно просто поговорить.' },
      { speaker: 'Bainov', emotion: 'dark', text: '— Поговорить?\n— Вы правда думаете, что всё решается добрыми словами?' },
      { speaker: 'Valeria', emotion: 'angry', text: '— А ты думаешь, что имеешь право ломать людей?' },
      { speaker: 'Bainov', emotion: 'dark', text: '— Я ничего не ломаю. Я просто показываю, что внутри у всех пустота.' },
      { speaker: 'Marina', emotion: 'mysterious', text: '— Это артефакт. Чёрное Сердце Ангары.' },
      { speaker: 'Alexander', emotion: 'serious', text: '— Значит, кулон вытягивает эмоции.' },
      { speaker: 'Vlada', emotion: 'defense', text: '— Тогда мы должны его остановить.' },
      { speaker: 'Bainov', emotion: 'dark', text: '— Попробуйте.' },
      { speaker: 'Narrator', text: 'Баинов сжимает кулон. Вокруг него вспыхивает тёмное свечение.' }
    ]
  },
  {
    id: 'scene_3_transformation', title: 'Пробуждение Sailor Warriors', backgroundClass: 'bg-bgu-dark-corridor',
    lines: [
      { speaker: 'Marina', emotion: 'mysterious', text: '— Он уже начал охоту. Его цель — не студенты. Его цель — мы.' },
      { speaker: 'Aleksey', emotion: 'power', text: '— Тогда мы не будем прятаться.' },
      { speaker: 'Alexander', emotion: 'serious', text: '— Если артефакт питается эмоциями, значит, его можно перегрузить обратной силой.' },
      { speaker: 'Valeria', emotion: 'confident', text: '— Отлично. Значит, бьём по нему всем, что у нас есть.' },
      { speaker: 'Vlada', emotion: 'defense', text: '— Сначала защитим остальных.' },
      { speaker: 'Yulia', emotion: 'happy', text: '— И вернём людям то, что он украл.' },
      { speaker: 'Marina', emotion: 'power', text: '— Sailor Warriors, время пришло.' },
      { speaker: 'All', text: '— Сила света, пробудись!' }
    ]
  },
  {
    id: 'scene_4_first_battle', title: 'Первая битва', backgroundClass: 'bg-bgu-dark-corridor',
    lines: [
      { speaker: 'Narrator', text: 'Баинов выпускает волну тьмы. Несколько студентов замирают, их взгляды становятся пустыми.' },
      { speaker: 'Bainov', emotion: 'dark', text: '— Видите? Всё просто. Без чувств людям не больно.' },
      { speaker: 'Aleksey', emotion: 'worried', text: '— Без чувств люди перестают быть собой!' },
      { speaker: 'Bainov', emotion: 'dark', text: '— А с чувствами они страдают.' },
      { speaker: 'Vlada', emotion: 'defense', text: '— Страдание не повод отнимать у людей сердце.' },
      { speaker: 'Valeria', emotion: 'angry', text: '— Хватит философии.' },
      { speaker: 'Valeria', emotion: 'power', text: '— Огненный знак справедливости!' },
      { speaker: 'Narrator', text: 'Пламя Валерии ударяет по тьме, но Чёрное Сердце поглощает часть энергии.' },
      { speaker: 'Alexander', emotion: 'thinking', text: '— Он усиливается от резких эмоций. Злость делает его сильнее.' },
      { speaker: 'Valeria', emotion: 'angry', text: '— Серьёзно? Даже злиться нормально нельзя?' },
      { speaker: 'Marina', emotion: 'calm', text: '— Можно. Но не дать злости управлять собой.' },
      { speaker: 'Yulia', emotion: 'soft', text: '— Валерия, мы с тобой. Не одна.' },
      { speaker: 'Valeria', emotion: 'confident', text: '— Ладно. Тогда не ярость. Справедливость.' },
      { speaker: 'Narrator', text: 'Валерия снова атакует, но уже спокойнее. Тьма отступает. Баинов исчезает.' },
      { speaker: 'Bainov', emotion: 'dark', text: '— Сегодня вы устояли. Но вечером всё изменится.\n— Я покажу вам, что ваша дружба — просто привычка.' }
    ]
  },
  {
    id: 'scene_5_team_discussion', title: 'Обсуждение команды', backgroundClass: 'bg-bgu-empty-classroom',
    lines: [
      { speaker: 'Narrator', text: 'Команда собирается после первой встречи с Баиновым.' },
      { speaker: 'Alexander', emotion: 'thinking', text: '— Он не просто нападает. Он проверяет наши слабости.' },
      { speaker: 'Marina', emotion: 'calm', text: '— Чёрное Сердце питается не только эмоциями. Оно питается трещинами между людьми.' },
      { speaker: 'Vlada', emotion: 'main', text: '— Значит, он попытается нас поссорить.' },
      { speaker: 'Yulia', emotion: 'soft', text: '— Но мы же не поссоримся, правда?' },
      { speaker: 'Narrator', text: 'Пауза.' },
      { speaker: 'Valeria', emotion: 'confident', text: '— Не надо делать вид, что мы идеальные. Мы иногда раздражаем друг друга.' },
      { speaker: 'Aleksey', emotion: 'happy', text: '— Да. Но это не значит, что мы не команда.' },
      { speaker: 'Marina', emotion: 'mysterious', text: '— Сегодня вечером в БГУ будет студенческое мероприятие. Там соберётся много людей.' },
      { speaker: 'Alexander', emotion: 'serious', text: '— Идеальное место для атаки.' },
      { speaker: 'Vlada', emotion: 'defense', text: '— Значит, мы будем там.' },
      { type: 'choice', title: 'Как подготовиться к вечеру?', choices: [
        { text: 'Укрепить командный дух.', effects: { teamBond: 15, empathy: 10 }, result: [
          { speaker: 'Yulia', emotion: 'soft', text: '— Давайте просто скажем честно: кто чего боится?' },
          { speaker: 'Aleksey', emotion: 'worried', text: '— Я боюсь, что однажды не смогу вас удержать вместе.' },
          { speaker: 'Vlada', emotion: 'kind', text: '— А я боюсь не успеть защитить тех, кто мне дорог.' },
          { speaker: 'Valeria', emotion: 'confident', text: '— Я боюсь, что из-за моего характера всё испорчу.' },
          { speaker: 'Marina', emotion: 'calm', text: '— Страх не делает вас слабее. Он показывает, что вам не всё равно.' }
        ]},
        { text: 'Изучить Чёрное Сердце Ангары.', effects: { logic: 15, courage: 5 }, result: [
          { speaker: 'Alexander', emotion: 'thinking', text: '— Его сила растёт, когда люди замыкаются в себе.\n— Но если несколько человек действуют вместе, артефакт теряет стабильность.' },
          { speaker: 'Marina', emotion: 'mysterious', text: '— Значит, победить его можно только общей силой.' }
        ]},
        { text: 'Найти Баинова и поговорить с ним до атаки.', effects: { courage: 10, empathy: 10, justice: 5 }, result: [
          { speaker: 'Aleksey', emotion: 'worried', text: '— Может, он ещё может остановиться.' },
          { speaker: 'Valeria', emotion: 'angry', text: '— Или заманит нас в ловушку.' },
          { speaker: 'Yulia', emotion: 'soft', text: '— Даже если так, стоит попробовать.' },
          { speaker: 'Narrator', text: 'Команда находит Баинова возле лестницы.' },
          { speaker: 'Bainov', emotion: 'main', text: '— Пришли спасать меня?' },
          { speaker: 'Aleksey', emotion: 'main', text: '— Нет. Пришли понять тебя.' },
          { speaker: 'Bainov', emotion: 'dark', text: '— Поздно.' }
        ]}
      ]}
    ]
  },
  {
    id: 'scene_6_evening_event', title: 'Вечернее мероприятие', backgroundClass: 'bg-bgu-auditorium-evening',
    lines: [
      { speaker: 'Narrator', text: 'В зале проходит студенческий вечер. Люди общаются, смеются, фотографируются. Юлия пытается поддерживать атмосферу.' },
      { speaker: 'Yulia', emotion: 'happy', text: '— Вот видите? Пока люди смеются, он не сможет победить.' },
      { speaker: 'Alexander', emotion: 'serious', text: '— Не расслабляйтесь. Он где-то рядом.' },
      { speaker: 'Narrator', text: 'Свет в зале мигает. На сцене появляется Баинов.' },
      { speaker: 'Bainov', emotion: 'dark', text: '— Как красиво.\n— Все улыбаются, будто это что-то значит.' },
      { speaker: 'Vlada', emotion: 'defense', text: '— Уходи со сцены.' },
      { speaker: 'Bainov', emotion: 'dark', text: '— Нет. Сегодня я покажу всем правду.' },
      { speaker: 'Narrator', text: 'Он поднимает Чёрное Сердце Ангары. Зал погружается в темноту.' }
    ]
  },
  {
    id: 'scene_7_bainov_trap', title: 'Ловушка Баинова', backgroundClass: 'bg-bgu-auditorium-dark',
    lines: [
      { speaker: 'Narrator', text: 'Каждый герой видит свой страх.' },
      { speaker: 'Aleksey', emotion: 'worried', text: 'Алексей видит: команда ссорится и уходит от него.' },
      { speaker: 'Shadow', text: '— Ты не лидер. Ты просто боишься остаться один.' },
      { speaker: 'Alexander', emotion: 'serious', text: 'Александр видит: он не может найти решения.' },
      { speaker: 'Shadow', text: '— Твой ум бесполезен, когда людям больно.' },
      { speaker: 'Marina', emotion: 'mysterious', text: 'Марина видит: команда больше не слушает её.' },
      { speaker: 'Shadow', text: '— Ты всегда рядом, но никогда не внутри.' },
      { speaker: 'Vlada', emotion: 'defense', text: 'Влада видит: она не успевает никого защитить.' },
      { speaker: 'Shadow', text: '— Сила ничего не значит, если ты опоздала.' },
      { speaker: 'Valeria', emotion: 'angry', text: 'Валерия видит: её слова ранят друзей.' },
      { speaker: 'Shadow', text: '— Ты называешь это справедливостью, но это просто злость.' },
      { speaker: 'Yulia', emotion: 'soft', text: 'Юлия видит: люди смеются без неё, а она больше никому не нужна.' },
      { speaker: 'Shadow', text: '— Твой свет исчезнет, когда на тебя перестанут смотреть.' }
    ]
  },
  {
    id: 'scene_8_personal_fear', title: 'Внутренний выбор игрока', backgroundClass: 'bg-bgu-auditorium-dark',
    lines: [
      { speaker: '$player', emotion: 'power', textByCharacter: {
        Aleksey: '— Я правда боюсь потерять команду.\n— Но лидер — это не тот, кто всегда сильный.\n— Лидер — это тот, кто возвращается к своим, даже когда страшно.',
        Alexander: '— Я не могу просчитать всё.\n— Но я могу быть рядом и помочь хотя бы шаг за шагом.\n— Иногда решение — это не формула, а доверие.',
        Marina: '— Я не обязана быть в центре, чтобы быть важной.\n— Иногда тот, кто направляет из тени, тоже часть света.',
        Vlada: '— Я не смогу защитить всех от всего.\n— Но я могу быть рядом, когда им страшно.\n— И этого уже достаточно.',
        Valeria: '— Да, я резкая.\n— Да, я иногда перегибаю.\n— Но я не враг своим друзьям. Моя сила — не злость, а верность.',
        Yulia: '— Я не просто улыбка и внимание.\n— Я правда люблю этих людей.\n— И мой свет не исчезнет, пока я делюсь им с другими.'
      }}
    ]
  },
  {
    id: 'scene_9_team_returns', title: 'Команда возвращается', backgroundClass: 'bg-bgu-auditorium-dark',
    lines: [
      { speaker: 'Narrator', text: 'Герои слышат голоса друг друга.' },
      { speaker: 'Aleksey', emotion: 'power', text: '— Ребята! Слышите меня?' },
      { speaker: 'Yulia', emotion: 'power', text: '— Слышу!' },
      { speaker: 'Vlada', emotion: 'power', text: '— Я рядом.' },
      { speaker: 'Alexander', emotion: 'power', text: '— Мы всё ещё связаны.' },
      { speaker: 'Valeria', emotion: 'power', text: '— Баинов, ты просчитался.' },
      { speaker: 'Marina', emotion: 'power', text: '— Он пытался разделить нас страхами. Но страхи стали мостами.' },
      { speaker: 'Bainov', emotion: 'dark', text: '— Нет… Почему вы не ломаетесь?' },
      { speaker: 'Aleksey', emotion: 'happy', text: '— Потому что дружба — это не отсутствие ссор.' },
      { speaker: 'Yulia', emotion: 'happy', text: '— Это когда после ссоры всё равно выбираешь быть рядом.' },
      { speaker: 'Vlada', emotion: 'kind', text: '— Это когда защищаешь не идеальных, а своих.' },
      { speaker: 'Valeria', emotion: 'confident', text: '— Это когда говоришь правду, но не бросаешь.' },
      { speaker: 'Alexander', emotion: 'serious', text: '— Это система, которую нельзя разрушить одним ударом.' },
      { speaker: 'Marina', emotion: 'calm', text: '— Потому что она живая.' }
    ]
  },
  {
    id: 'scene_10_final_battle', title: 'Финальная битва', backgroundClass: 'bg-bgu-auditorium-dark',
    lines: [
      { speaker: 'Narrator', text: 'Баинов направляет всю силу артефакта на команду.' },
      { speaker: 'Bainov', emotion: 'dark', text: '— Если я не могу иметь такую связь, значит, её не должно быть ни у кого!' },
      { speaker: 'Aleksey', emotion: 'power', text: '— Ты можешь. Но не через разрушение.' },
      { speaker: 'Bainov', emotion: 'dark', text: '— Замолчи!' },
      { speaker: 'Narrator', text: 'Тьма атакует.' },
      { speaker: 'Vlada', emotion: 'power', text: '— Барьер Юпитера!' },
      { speaker: 'Narrator', text: 'Влада защищает команду.' },
      { speaker: 'Alexander', emotion: 'power', text: '— Сейчас! Его ядро нестабильно!' },
      { speaker: 'Marina', emotion: 'power', text: '— Направьте силу не против Баинова. Против артефакта.' },
      { speaker: 'Valeria', emotion: 'power', text: '— Священный огонь Марса!' },
      { speaker: 'Yulia', emotion: 'power', text: '— Свет Венеры!' },
      { speaker: 'Vlada', emotion: 'power', text: '— Сила Юпитера!' },
      { speaker: 'Alexander', emotion: 'power', text: '— Поток Меркурия!' },
      { speaker: 'Marina', emotion: 'power', text: '— Лунное направление!' },
      { speaker: 'Aleksey', emotion: 'power', text: '— Во имя Луны и нашей дружбы…' },
      { speaker: 'All', text: '— Sailor Warriors, сияние сердец!' },
      { speaker: 'Narrator', text: 'Чёрное Сердце трескается. Из него вырывается поток украденных эмоций. Студенты в зале начинают приходить в себя. Артефакт разрушается.' }
    ]
  },
  {
    id: 'scene_11_after_battle', title: 'После битвы', backgroundClass: 'bg-bgu-auditorium-after-battle',
    lines: [
      { speaker: 'Narrator', text: 'Баинов падает на колени. Тёмная энергия исчезает.' },
      { speaker: 'Bainov', emotion: 'vulnerable', text: '— Я просто…\n— Я просто хотел понять, почему у вас есть это.\n— Почему вы нужны друг другу.\n— А меня будто никто не видит.' },
      { speaker: 'Narrator', text: 'Пауза.' },
      { speaker: 'Yulia', emotion: 'soft', text: '— Это больно. Но ты не должен был забирать чувства у других.' },
      { speaker: 'Valeria', emotion: 'confident', text: '— Ты натворил дел. Очень много.' },
      { speaker: 'Vlada', emotion: 'kind', text: '— Но ты всё ещё можешь остановиться.' },
      { speaker: 'Alexander', emotion: 'serious', text: '— Артефакт усиливал твою обиду. Но выбор всё равно был твоим.' },
      { speaker: 'Marina', emotion: 'calm', text: '— Теперь у тебя есть другой выбор.' },
      { speaker: 'Narrator', text: 'Алексей подходит к Баинову и протягивает руку.' },
      { speaker: 'Aleksey', emotion: 'happy', text: '— Сердце нельзя заставить светить.\n— Но ему можно помочь.' },
      { speaker: 'Narrator', text: 'Баинов смотрит на руку Алексея.' },
      { speaker: 'Bainov', emotion: 'vulnerable', text: '— После всего этого… вы правда не отвернётесь?' },
      { speaker: 'Aleksey', emotion: 'main', text: '— Мы не забудем, что ты сделал.\n— Но если ты правда хочешь измениться — начни сейчас.' },
      { speaker: 'Narrator', text: 'Баинов медленно принимает руку.' }
    ]
  },
  {
    id: 'scene_12_ending', title: 'Финал у Ангары', backgroundClass: 'bg-irkutsk-night',
    lines: [
      { speaker: 'Narrator', text: 'Команда выходит из университета.\nНад Ангарой снова дует холодный ветер, но теперь он кажется живым и свежим.' },
      { speaker: 'Yulia', emotion: 'happy', text: '— После такого вечера нам точно нужен чай.' },
      { speaker: 'Valeria', emotion: 'confident', text: '— И пирожное. Я заслужила.' },
      { speaker: 'Alexander', emotion: 'thinking', text: '— Технически все заслужили.' },
      { speaker: 'Vlada', emotion: 'kind', text: '— Главное, что все целы.' },
      { speaker: 'Marina', emotion: 'calm', text: '— И главное, что свет вернулся.' },
      { speaker: 'Aleksey', emotion: 'happy', text: '— Нет. Главное, что мы вернулись друг к другу.' },
      { speaker: 'Narrator', text: 'Команда уходит вместе.\n\nВ эту ночь БГУ снова наполнился голосами, смехом и жизнью.\nЧёрное Сердце Ангары было разрушено.\nНо Sailor Warriors знали: пока в людях есть страх, одиночество и обида, тьма может вернуться.\nА значит, их история только начинается.' },
      { speaker: 'Narrator', text: '«Сердце нельзя украсть, если рядом есть те, кто помогает ему светить.»' }
    ]
  }
];

const initialState = () => ({
  playerCharacter: null,
  currentSceneIndex: 0,
  currentLineIndex: 0,
  teamBond: 50,
  courage: 50,
  empathy: 50,
  logic: 50,
  justice: 50,
  voiceEnabled: true,
  selectedChoices: [],
  gameStarted: false,
  ending: null,
  pendingLines: []
});

let state = initialState();
const screen = document.getElementById('screen');
const voiceBtn = document.getElementById('voiceBtn');
const restartBtn = document.getElementById('restartBtn');

async function initGame() {
  storyData = await loadStoryData();
  voiceBtn.addEventListener('click', toggleVoice);
  restartBtn.addEventListener('click', restartGame);
  updateVoiceButton();
  renderStartScreen();
}

async function loadStoryData() {
  try {
    const response = await fetch('assets/data/story.json', { cache: 'no-store' });
    if (!response.ok) throw new Error('story.json недоступен');
    const data = await response.json();
    return Array.isArray(data.scenes) ? data.scenes : fallbackStoryData;
  } catch (error) {
    console.info('Используется fallbackStoryData:', error.message);
    return fallbackStoryData;
  }
}

function startGame() {
  state = initialState();
  state.gameStarted = true;
  unlockSpeech();
  saveGame();
  renderCharacterSelect();
}

function unlockSpeech() {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
}

function renderStartScreen() {
  const continueButton = hasSave() ? '<button class="primary-btn" type="button" onclick="continueGame()">Продолжить</button>' : '';
  screen.innerHTML = `
    <section class="start-screen bg-irkutsk-night">
      <div class="start-hero">
        <span class="brand__kicker">Sailor Warriors</span>
        <h2>Чёрное Сердце Ангары</h2>
        <p>Мобильная браузерная visual novel о дружбе, страхах и магической команде, которая защищает БГУ от тёмного артефакта.</p>
        <p>Озвучка работает через Web Speech API. На телефоне она активируется после первого нажатия.</p>
        <div class="start-actions">
          ${continueButton}
          <button class="primary-btn" type="button" onclick="startGame()">Новая игра</button>
          <button class="secondary-btn danger-btn" type="button" onclick="resetSave()">Сбросить прогресс</button>
        </div>
      </div>
    </section>`;
}

function selectCharacter(characterId) {
  state.playerCharacter = characterId;
  state.currentSceneIndex = 0;
  state.currentLineIndex = 0;
  state.pendingLines = [];
  state.gameStarted = true;
  saveGame();
  renderScene();
}

function renderCharacterSelect() {
  screen.innerHTML = `
    <section class="character-select bg-bgu-morning">
      <h2>Выберите, за кого вы хотите пройти историю.</h2>
      <div class="character-grid">
        ${playableCharacterIds.map(id => characterCardTemplate(id)).join('')}
      </div>
    </section>`;
}

function characterCardTemplate(characterId) {
  const character = characters[characterId];
  const image = getCharacterImage(characterId, 'main');
  return `
    <article class="character-card">
      <div class="character-card__art">
        <img src="${image}" alt="${character.name}" onerror="handleImageError(this)" onload="handleImagePlaceholder(this)">
      </div>
      <div class="character-card__body">
        <h3>${character.name}</h3>
        <div class="alter-ego">${character.role}</div>
        <p>${character.description}</p>
        <button class="primary-btn" type="button" onclick="selectCharacter('${characterId}')">Играть</button>
      </div>
    </article>`;
}

function renderScene() {
  const scene = storyData[state.currentSceneIndex];
  if (!scene) return renderEnding();
  screen.innerHTML = `
    <section class="vn-stage">
      <div id="sceneBg" class="scene-bg ${scene.backgroundClass || 'bg-bgu-morning'}"></div>
      <div class="scene-indicator">${state.currentSceneIndex + 1}/${storyData.length} · ${scene.title}</div>
      <div id="characterArea" class="character-area"></div>
      <div class="vn-bottom">
        <div class="stats">${statsTemplate()}</div>
        <div class="dialogue">
          <div id="speakerName" class="speaker-name"></div>
          <p id="dialogueText" class="dialogue-text"></p>
          <div id="choices" class="choices hidden"></div>
          <div id="dialogueActions" class="dialogue-actions">
            <button id="nextBtn" class="primary-btn next-btn" type="button" onclick="nextLine()">Далее</button>
          </div>
        </div>
      </div>
    </section>`;
  renderLine();
}

function renderLine() {
  const line = getCurrentLine();
  if (!line) return goToNextScene();
  if (line.type === 'choice') return renderChoices(line);

  const speakerId = resolveSpeakerId(line.speaker);
  const text = resolveLineText(line);
  const speaker = characters[speakerId] || characters.Narrator;

  document.getElementById('speakerName').textContent = speaker.name || speakerId;
  document.getElementById('dialogueText').textContent = text;
  document.getElementById('choices').classList.add('hidden');
  document.getElementById('dialogueActions').classList.remove('hidden');
  renderCharacter(speakerId, line.emotion || 'main');
  speakText(text, speakerId);
  saveGame();
}

function getCurrentLine() {
  if (state.pendingLines && state.pendingLines.length > 0) return state.pendingLines[0];
  const scene = storyData[state.currentSceneIndex];
  return scene?.lines?.[state.currentLineIndex] || null;
}

function resolveSpeakerId(speakerId) {
  return speakerId === '$player' ? state.playerCharacter : speakerId;
}

function resolveLineText(line) {
  if (line.textByCharacter && state.playerCharacter) return line.textByCharacter[state.playerCharacter] || '';
  return line.text || '';
}

function nextLine() {
  stopSpeech();
  if (state.pendingLines && state.pendingLines.length > 0) {
    state.pendingLines.shift();
    if (state.pendingLines.length > 0) return renderLine();
    state.currentLineIndex += 1;
    saveGame();
    return renderLine();
  }
  state.currentLineIndex += 1;
  renderLine();
}

function renderChoices(choiceLine) {
  document.getElementById('speakerName').textContent = choiceLine.title || 'Выбор';
  document.getElementById('dialogueText').textContent = 'Выберите действие. Ваш выбор повлияет на характеристики команды.';
  document.getElementById('dialogueActions').classList.add('hidden');
  const choicesBox = document.getElementById('choices');
  choicesBox.classList.remove('hidden');
  choicesBox.innerHTML = choiceLine.choices.map((choice, index) => {
    const effects = Object.entries(choice.effects || {}).map(([key, value]) => `${statName(key)} +${value}`).join(', ');
    return `<button class="choice-btn" type="button" onclick="applyChoiceEffects(getCurrentLine().choices[${index}])"><strong>${choice.text}</strong><small>${effects}</small></button>`;
  }).join('');
  renderCharacter(state.playerCharacter || 'Aleksey', 'main');
  saveGame();
}

function applyChoiceEffects(choice) {
  Object.entries(choice.effects || {}).forEach(([key, value]) => {
    state[key] = clamp((state[key] || 0) + value, 0, 100);
  });
  state.selectedChoices.push({ sceneId: storyData[state.currentSceneIndex].id, text: choice.text, effects: choice.effects });
  state.pendingLines = [...(choice.result || [])];
  saveGame();
  renderLine();
}

function goToNextScene() {
  state.currentSceneIndex += 1;
  state.currentLineIndex = 0;
  state.pendingLines = [];
  saveGame();
  if (state.currentSceneIndex >= storyData.length) return renderEnding();
  renderScene();
}

function renderCharacter(characterId, emotion = 'main') {
  const area = document.getElementById('characterArea');
  if (!area) return;
  const character = characters[characterId];
  if (!character || !character.imagePrefix) {
    area.innerHTML = '';
    return;
  }
  const src = getCharacterImage(characterId, emotion);
  area.innerHTML = `
    <div class="character-sprite-wrap">
      <img class="character-sprite" src="${src}" alt="${character.name}" onerror="handleImageError(this)" onload="handleImagePlaceholder(this)">
    </div>`;
}

function getCharacterImage(characterId, emotion = 'main') {
  const character = characters[characterId];
  if (!character || !character.imagePrefix) return '';
  return `${imageBasePath}${character.imagePrefix}_${emotion}.png`;
}

function handleImagePlaceholder(img) {
  if (img.naturalWidth <= 2 && img.naturalHeight <= 2) handleImageError(img);
}

function handleImageError(img) {
  const alt = img.alt || 'Персонаж';
  const wrapper = img.closest('.character-sprite-wrap') || img.closest('.character-card__art');
  if (!wrapper) {
    img.style.display = 'none';
    return;
  }
  const character = Object.values(characters).find(item => item.name === alt || item.shortName === alt) || { name: alt, role: 'Персонаж' };
  wrapper.innerHTML = `<div class="character-placeholder"><h3>${character.name}</h3><p>${character.role || 'Персонаж'}</p></div>`;
}

function speakText(text, speakerId) {
  if (!state.voiceEnabled || !('speechSynthesis' in window) || !text) return;
  stopSpeech();
  const cleanText = text.replace(/[—«»]/g, '').replace(/\n/g, ' ');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  const speaker = characters[resolveSpeakerId(speakerId)] || characters.Narrator;
  utterance.lang = 'ru-RU';
  utterance.pitch = speaker.pitch || 1;
  utterance.rate = speaker.rate || 1;
  try { window.speechSynthesis.speak(utterance); } catch (error) { console.info('Озвучка недоступна:', error.message); }
}

function stopSpeech() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function toggleVoice() {
  state.voiceEnabled = !state.voiceEnabled;
  if (!state.voiceEnabled) stopSpeech();
  updateVoiceButton();
  saveGame();
}

function updateVoiceButton() {
  if (voiceBtn) voiceBtn.textContent = `Voice: ${state.voiceEnabled ? 'ON' : 'OFF'}`;
}

function saveGame() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch (error) { console.info('Не удалось сохранить игру:', error.message); }
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return { ...initialState(), ...JSON.parse(raw) };
  } catch (error) {
    console.info('Не удалось загрузить сохранение:', error.message);
    return null;
  }
}

function hasSave() { return Boolean(loadGame()); }

function continueGame() {
  const saved = loadGame();
  if (!saved) return renderStartScreen();
  state = saved;
  updateVoiceButton();
  unlockSpeech();
  if (!state.playerCharacter) return renderCharacterSelect();
  if (state.ending) return renderEnding();
  renderScene();
}

function resetSave() {
  stopSpeech();
  localStorage.removeItem(SAVE_KEY);
  state = initialState();
  updateVoiceButton();
  renderStartScreen();
}

function restartGame() {
  stopSpeech();
  localStorage.removeItem(SAVE_KEY);
  state = initialState();
  updateVoiceButton();
  renderStartScreen();
}

function determineEnding() {
  if (state.teamBond >= 70 && state.empathy >= 60 && state.logic >= 55) {
    return { id: 'true', title: 'Истинная концовка', text: 'Команда не только разрушает артефакт, но и понимает страхи друг друга. Баинов принимает помощь. Sailor Warriors становятся сильнее.' };
  }
  if (state.teamBond >= 60) {
    return { id: 'good', title: 'Хорошая концовка', text: 'Артефакт разрушен. Баинов принимает помощь, но некоторые раны остаются.' };
  }
  if (state.teamBond >= 40) {
    return { id: 'neutral', title: 'Нейтральная концовка', text: 'Артефакт разрушен, но Баинов уходит один. Команда побеждает, но чувствует, что не смогла достучаться до него.' };
  }
  return { id: 'bad', title: 'Плохая концовка', text: 'Команда побеждает, но отношения внутри Sailor Warriors повреждены. Свет вернулся в БГУ, но внутри команды осталась трещина.' };
}

function renderEnding() {
  const ending = state.ending || determineEnding();
  state.ending = ending;
  saveGame();
  stopSpeech();
  screen.innerHTML = `
    <section class="ending-screen bg-irkutsk-night">
      <div class="ending-card">
        <span class="brand__kicker">Финал</span>
        <h2>${ending.title}</h2>
        <p>${ending.text}</p>
        <div class="ending-stats">
          ${endingStatTemplate('Связь', state.teamBond)}
          ${endingStatTemplate('Смелость', state.courage)}
          ${endingStatTemplate('Эмпатия', state.empathy)}
          ${endingStatTemplate('Логика', state.logic)}
          ${endingStatTemplate('Справедливость', state.justice)}
        </div>
        <button class="primary-btn" type="button" onclick="restartGame()">Играть снова</button>
      </div>
    </section>`;
}

function statsTemplate() {
  return [
    ['Связь', state.teamBond], ['Смелость', state.courage], ['Эмпатия', state.empathy], ['Логика', state.logic], ['Справедливость', state.justice]
  ].map(([label, value]) => `<div class="stat"><span>${label}</span><strong>${value}</strong></div>`).join('');
}

function endingStatTemplate(label, value) { return `<div class="ending-stat"><span>${label}</span><strong>${value}</strong></div>`; }
function statName(key) { return ({ teamBond: 'Связь', courage: 'Смелость', empathy: 'Эмпатия', logic: 'Логика', justice: 'Справедливость' }[key] || key); }
function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }

document.addEventListener('DOMContentLoaded', initGame);
