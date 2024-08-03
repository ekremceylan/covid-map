import { render, screen } from "@testing-library/react";
import Detail from "../pages/Detail/index";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

//Test ortamında ki sahte storenin kurulumu
const mockStore = configureStore([thunk]);

it("yüklenme durumunda loader bileşenleri ekrana basılır", () => {
  //yüklenme durumundaki store'u simüle et
  const store = mockStore({
    isLoading: true,
    error: null,
    data: null,
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Detail />
      </BrowserRouter>
    </Provider>
  );

  //Loaderlar ekrana geliyor mu
  screen.getByTestId("header-loader");
  screen.getAllByTestId("card-loader");
});

it("hata gelme durumunda error billeşeni ekrana basılır", () => {
  const store = mockStore({
    isLoading: false,
    error: "404 content not found",
    data: null,
  });

  render(
    <Provider store={store}>
      <BrowserRouter>
        <Detail />
      </BrowserRouter>
    </Provider>
  );

  //Hata metnini içeren element ekrana basıldı mı
  screen.getByText(/404 content/i);
});

it("veri gelme durumunda ülke bilgisi ve kartlar ekrana basılır ", () => {
  //Storedeki veri gelme durumunu store i simule et
  const store = mockStore({
    isLoading: false,
    error: "404 content not found",
    data: exa_data,
  });
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Detail />
      </BrowserRouter>
    </Provider>
  );

  //1..ülke detayları ekrana geliyor mu

  // Ülke ismi ekrana geliyor mu
  screen.getByText("Türkiye");

  //Ekranda ki resmi al
  const img = screen.getByRole("img");

  // Ekrandaki resmin kaynağı doğru mu?
  expect(img).toHaveProperty("src", exa_data.country.flags.png);

  //2.. kartlar ekrana geliyor mu

  //Covid nesnesini diziye cevir
  const arr = Object.entries(exa_data.covid);

  //Dizideki bütün elemanların key ve value değeri ekrana basılıyor mu
  arr.forEach((item) => {
    //Başlık ekrana geldi mi?
    screen.getByText(item[0].split("_").join(" "));

    //Değer ekrana geldi mi?
    screen.getByText(item[1]);
  });
});
