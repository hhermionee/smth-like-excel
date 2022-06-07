# smth-like-excel
Trying to implement excel functions in a single-page application using pure JavaScript

Что из себя представляет:
Single Page Application. Состоит из «главного экрана», где показывается список всех таблиц, которые есть у пользователя, и таблиц, которые генерятся по нажатию кнопки «создать» или же по ссылке на уже существующую таблицу. Каждая новая таблица сохраняется, у нее есть дата обновления. Все данные хранятся в LocalStorage (пока).
В самих таблицах можно:
- считать данные в графе «формула», значение сохранится в выделенную ячейку;
- выделять ячейку и группу ячеек (с помощью клавиши «Shift»);
- менять размеры колонок и столбцов с помощью мыши;
- перемещаться по таблице, используя клавиши «вверх», «вниз», «влево», «вправо», «Tab» и «Enter».
Выполнено с применением ООП, написан "свой" стейт менеджер

TODO:
- [ ] "я ввожу формулу в ячейку таблицы, а не в поле с формулой, и все считается прямо в ней"
- [ ] "я могу апеллировать в ячейке данными из других ячеек - добавлять их в формулы - и считать результат динамически"
- [ ] "я могу задать свой размер таблицы или расширить уже существующий"
- [ ] оптимизация рендера под расширение таблицы?? подумать
