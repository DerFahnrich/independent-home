class NetworkService {
    getHeaders = () => {
        const headers: { [k: string]: string } = {
            'X-TVXClientType': 'admin',
            'Content-Type': 'application/json;charset=utf-8',
        };

        return new Headers(headers);
    };

    getPlainTextHeaders = () => {
        const headers: { [k: string]: string } = {
            'X-TVXClientType': 'admin',
            'Content-Type': 'text/plain',
        };

        return new Headers(headers);
    };

    getOptions = (): RequestInit => ({
        headers: this.getHeaders(),
        credentials: 'include',
    });

    postOptions = (body: any): RequestInit => ({
        headers: typeof body === 'string' ? this.getPlainTextHeaders() : this.getHeaders(),
        method: 'POST',
        credentials: 'include',
        body: typeof body === 'string' ? body : JSON.stringify(body),
    });

    putOptions = (body: any): RequestInit => ({
        headers: this.getHeaders(),
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(body),
    });

    deleteOptions = (): RequestInit => ({
        headers: this.getHeaders(),
        method: 'DELETE',
        credentials: 'include',
    });

    sendGet = async (path: string) => {
        let response: Response;
        try {
            response = await fetch(path, this.getOptions());
        } catch (e) {
            console.error('Error requesting home', e);
            throw e;
        }

        if (response.ok) {
            return response;
        }

        // If result is not in 200 range, throw it
        throw response;
    };

    sendPost = async (path: string, body: any) => {
        let response = undefined;
        try {
            response = await fetch(path, this.postOptions(body));
        } catch (e) {
            console.error('Error requesting home', e);
            throw e;
        }

        if (response.ok) {
            return response;
        }

        // If result is not in 200 range, throw it
        throw response;
    };

    sendPut = async (path: string, body: any) => {
        let response: Response;
        try {
            response = await fetch(path, this.putOptions(body));
        } catch (e) {
            console.error('Error requesting home', e);
            throw e;
        }

        if (response.ok) {
            return response;
        }

        // If result is not in 200 range, throw it
        throw response;
    };

    sendDelete = async (path: string) => {
        let response = undefined;

        try {
            response = await fetch(path, this.deleteOptions());
        } catch (e) {
            console.error('Error requesting home', e);
            throw e;
        }

        if (response.ok) {
            return response;
        }

        // If result is not in 200 range, throw it
        throw response;
    };

    downloadResult(data: string, status: any, headers: { (): any; [x: string]: any; }) {
        headers = headers();
        const arrayBuffer = this.toArrayBuffer(data);
        const splitted = headers['content-disposition'].split(';');
        let filename = '';
        splitted.forEach(function (str: string) {
            if (str.trim().startsWith("filename")) {
                filename = str.split('=')[1];
            }
        });
        const contentType = headers['content-type'];
        const linkElement = document.createElement('a');
        const blob = new Blob([arrayBuffer], {type: contentType});
        linkElement.href = window.URL.createObjectURL(blob);
        linkElement.download = filename;
        document.body.appendChild(linkElement);

        linkElement.click();
        document.body.removeChild(linkElement);

        //TODO: Remove if not used
        // var clickEvent = MouseEvent("click", {
        //     "view": window,
        //     "bubbles": true,
        //     "cancelable": false
        // });
        //
        // linkElement.dispatchEvent(clickEvent);
    }
    toArrayBuffer(data: string) {
        const binaryString = window.atob(data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes;
    }

}

export default new NetworkService();
