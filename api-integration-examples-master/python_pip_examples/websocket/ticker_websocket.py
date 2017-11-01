from bitcoinaverage import TickerWebcosketClient

if __name__ == '__main__':
    secret_key = '' or input('Enter your secret key: ')
    public_key = '' or input('Enter your public key: ')

    print('Connecting to the ticker websocket...')
    ws = TickerWebcosketClient(public_key, secret_key)
    ws.ticker_data('local', 'BTCUSD')
