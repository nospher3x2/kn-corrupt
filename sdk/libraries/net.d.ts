declare class net {
    /**
     * Send a GET request to the specified URL.
     * @param url - The URL to send the get request to.
     */
    get(url: string): netResponse

    /**
     * Sends a POST request to the specified URL.
     * @param url - The URL to send the request to.
     * @param body - The body of the post request.
     * @param header - The headers to send along with the request.
     */
    post(url: string, body: string, header: string): netResponse | null

    /**
     * Asynchronously posts data to the specified URL.
     * @param url - The URL to send the request to.
     * @param body - The body of the post request.
     * @param header - The headers to send along with the request.
     * @param callback - Your function to handle the data returned.
     */
    postAsync(url: string, body: string, header: string, callback: Function): void

    /**
     * Updates script if version of data.json at the given url is higher than on disk and triggers callback with true if updated/false if not
     * @param dataUrl - url to download data.json from
     * @param fileUrl - url to download .corrupt/.lua from
     * @param callback - Your function, takes a boolean as a param of true/false if updated.
     */
    autoUpdateDirect(dataUrl: string, fileUrl: string, callback?: (updated: boolean) => void): void
}

declare global {
    const net : net
}

export {}