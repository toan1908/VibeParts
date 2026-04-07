# VibeParts

VibeParts la mot static web app de tim kiem linh kien dien tu, quan ly BOM, luu ghi chu, danh dau yeu thich va su dung bo calculator ky thuat ngay trong trinh duyet.

## Chay local

```bash
npm start
```

Neu ban khong muon dung npm, co the mo truc tiep `index.html` trong trinh duyet, nhung chay qua local server se on dinh hon cho ES modules.

## Cau truc

- `index.html`: giao dien chinh
- `css/styles.css`: toan bo giao dien
- `js/`: logic tim kiem, BOM, ghi chu, calculator va online search

## Deploy len GitHub Pages

Repo nay la mot static site, vi vay co the publish truc tiep bang GitHub Pages.
Trong repo GitHub, bo source duoc dat trong thu muc `docs/` de Pages co the deploy truc tiep tu nhanh `main`.

1. Push toan bo source len nhanh `main`
2. Vao `Settings -> Pages`
3. Chon `Deploy from a branch`
4. Chon branch `main` va folder `/docs`
5. Luu lai va doi GitHub Pages build

URL mac dinh cua project site se la:

`https://toan1908.github.io/VibeParts/`

File `.nojekyll` da duoc them san de GitHub Pages phuc vu static files truc tiep.
