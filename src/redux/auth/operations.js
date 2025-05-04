import { createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import {
  baseAxios,
  setAuthHeader,
  clearAuthHeader,
} from '../../service/axios';

// export const registerThunk = createAsyncThunk(
//   'auth/register',
//   async (credentials, thunkApi) => {
//     try {
//       const { data } = await baseAxios.post('users/signup', credentials);
//       setAuthHeader(data.token);
//       return data;
//     } catch (error) {
//       if (error.response.data.code === 11000) {
//         toast.error('User already exist!');
//         return thunkApi.rejectWithValue(error.message);
//       }
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const loginThunk = createAsyncThunk(
//   'auth/login',
//   async (credentials, thunkApi) => {
//     try {
//       const { data } = await baseAxios.post('users/login', credentials);
//       setAuthHeader(data.token);

//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

// export const logoutThunk = createAsyncThunk(
//   'auth/logout',
//   async (_, thunkAPI) => {
//     try {
//       await baseAxios.post('/users/logout');

//       clearAuthHeader();
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const refreshUserThunk = createAsyncThunk(
//   'auth/refresh',
//   async (_, thunkApi) => {
//     const savedToken = thunkApi.getState().auth.token;
//     if (!savedToken) {
//       return thunkApi.rejectWithValue('token is not exist');
//     }
//     setAuthHeader(savedToken);

//     try {
//       const { data } = await baseAxios.get('users/current');
//       return data;
//     } catch (error) {
//       return thunkApi.rejectWithValue(error.message);
//     }
//   }
// );

export const registerThunk = createAsyncThunk(
  'auth/register',
  // Перейменовано параметр на userData, щоб уникнути конфлікту імен
  async (userData, thunkApi) => {
    try {
      const { data } = await baseAxios.post('users/signup', userData); // Використовуємо baseAxios
      setAuthHeader(data.token); // Встановлюємо заголовок після успіху
      return data;
    } catch (error) {
      // Обробка специфічної помилки або загальна обробка
      if (error.response && error.response.data && error.response.data.code === 11000) {
         toast.error('Користувач з такою адресою вже існує!'); // Специфічне повідомлення
      } else {
         // Показуємо загальне повідомлення або повідомлення з бекенду, якщо доступне
         toast.error(`Помилка реєстрації: ${error.response?.data?.message || error.message}`);
      }
      // Повертаємо більш детальну інформацію про помилку для редюсера
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  'auth/login',
  // Перейменовано параметр на loginData
  async (loginData, thunkApi) => {
    try {
      const { data } = await baseAxios.post('users/login', loginData); // Використовуємо baseAxios
      setAuthHeader(data.token); // Встановлюємо заголовок після успіху
      return data;
    } catch (error) {
      // Обробка помилок входу
      toast.error(`Помилка входу: ${error.response?.data?.message || error.message}`);
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      // Важливо: Навіть якщо запит на бекенд вдалий, ми очищаємо токен
      // на фронтенді ДО запиту, або одразу після, щоб уникнути ситуацій
      // коли запит на вихід завис, а токен все ще висить.
      // Зазвичай очищення відбувається в редюсері logoutThunk.fulfilled.
       await baseAxios.post('/users/logout'); // Використовуємо baseAxios
       // clearAuthHeader(); // Це можна викликати тут або в редюсері fulfilled

    } catch (error) {
        // Обробка помилок виходу
        toast.error(`Помилка виходу: ${error.response?.data?.message || error.message}`);
       // Важливо: Якщо вихід не вдався на бекенді, можливо, варто все одно очистити
       // токен на фронтенді у редюсері rejected, щоб уникнути нескінченного "залогіненого" стану.
       // Це залежить від вашої бекенд-логіки. Залишаємо очищення в fulfilled для типового випадку.
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    } finally {
      // Часто очищення токена відбувається у фінальному блоці або в fulfilled редюсері
      // Гарантовано очищаємо заголовок Axios незалежно від успіху бекенд-запиту
       clearAuthHeader(); // Викликаємо тут для гарантованого очищення заголовка Axios
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    const state = thunkApi.getState();
    const savedToken = state.auth.token; // Отримуємо токен зі стану Redux

    // Перевіряємо наявність токена перед спробою оновлення
    if (!savedToken) {
      // Якщо токена немає, немає сенсу робити запит. Відхиляємо Thunk.
      return thunkApi.rejectWithValue('Authentication token is not available.');
    }

    // Встановлюємо заголовок авторизації для цього конкретного запиту refresh
    // Це потрібно, оскільки baseAxios може не мати заголовка, якщо додаток
    // було перезавантажено, а токен взято зі сховища (localStorage).
    setAuthHeader(savedToken);

    try {
      const { data } = await baseAxios.get('users/current'); // Використовуємо baseAxios
      return data; // Повертаємо дані користувача
    } catch (error) {
        // Обробка помилок оновлення (наприклад, недійсний токен)
        console.error('Refresh failed:', error.response?.data || error.message);
       // При помилці refresh (недійсний токен) редюсер rejected повинен скинути стан auth
      return thunkApi.rejectWithValue(error.response?.data || error.message);
    }
  }
);
