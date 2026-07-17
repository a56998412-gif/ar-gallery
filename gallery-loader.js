// gallery-loader.js
(function() {
    function csvToArray(str, delimiter = ",") {
        const headers = str.slice(0, str.indexOf("\r")).split(delimiter);
        const rows = str.slice(str.indexOf("\n") + 1).split(/\r?\n/);
        const arr = rows.map(function(row) {
            const values = row.split(delimiter);
            const el = headers.reduce(function(object, header, index) {
                object[header] = values[index];
                return object;
            }, {});
            return el;
        });
        return arr;
    }

    function loadFile(url) {
        var res = new XMLHttpRequest();
        res.open("GET", url, false);
        res.send(null);
        return res.responseText;
    }

    function createGalleryItem(item, index) {
        const title = item.Title;
        const modelPath = item.Adres;
        
        // Используем отдельный HTML-файл для просмотра
        const viewerUrl = `3D_Viewer_Standalone.html?model=${encodeURIComponent(modelPath)}&poster=Poster/${encodeURIComponent(title)}.png`;
        
        return `
            <a href="${viewerUrl}" target="_blank">
                <img src="Poster/${encodeURIComponent(title)}.png" alt="${title}" />
            </a>
            <p>${title}</p>
        `;
    }

    try {
        var text = loadFile('m_list.txt');
        console.log('Data loaded, length:', text.length);
        
        var v_DB = csvToArray(text);
        console.log('Parsed items:', v_DB.length);
        
        const wrap = document.querySelector('#wrap');
        
        for (let i = 0; i < v_DB.length; i++) {
            let div = document.createElement('div');
            div.className = 'tile';
            
            let div2 = document.createElement('div');
            div2.className = 'boxInner';
            div2.innerHTML = createGalleryItem(v_DB[i], i);
            
            div.appendChild(div2);
            wrap.appendChild(div);
        }
    } catch (error) {
        console.error('Error loading gallery:', error);
        document.querySelector('#wrap').innerHTML = '<p>Error loading gallery. Please check console.</p>';
    }
})();

