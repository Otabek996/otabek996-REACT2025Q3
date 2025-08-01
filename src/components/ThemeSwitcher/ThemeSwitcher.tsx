import { useTheme } from '../../context/ThemeContext';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'light' || value === 'dark') setTheme(value);
  };

  return (
    <select value={theme} onChange={handleThemeChange}>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
};

export default ThemeSwitcher;
