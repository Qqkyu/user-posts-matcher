# Program łączący dane o userach z danymi o postach

- pobiera dane o postach z https://jsonplaceholder.typicode.com/posts i łączy je z danymi o userach https://jsonplaceholder.typicode.com/users - *requestMatches()*
- liczy ile postów napisali userzy i zwraca listę stringów w postaci "user_name napisał(a) count postów" - *usersPostsCount()*
- sprawdza czy tytuły postów są unikalne i zwraca listę tytułów ktorę nie są - *duplicateTopicTitles()*
- dla każdego użytkownika znajduje innego użytkownika, który mieszka najbliżej niego - *matchClosestUsers()*

# Usage

```
git clone https://github.com/Qqkyu/user-posts-matcher
cd user-posts-matcher
npm install
node App.mjs
```
