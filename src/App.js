import './App.css';
import WeatherWidget from './components/weather/WeatherWidget';
import NewsFeed from './components/news/NewsFeed';
import TaskManager from './components/tasks/TasksManager';

function App() {
  return (
    <div className="container">
      <div className="top-row">
        <div className="weather">
          <WeatherWidget />
        </div>
        <div className="news">
          <NewsFeed />
        </div>
      </div>
      <div className="tasks">
        <TaskManager />
      </div>
    </div>
  );
}

export default App;
