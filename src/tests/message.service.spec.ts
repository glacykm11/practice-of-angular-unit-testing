import { MessageService } from "../app/message.service";


describe('Message Service', () => {
    let service: MessageService;

    beforeEach(() => {
        service = new MessageService();
    })

    it('should have no messages to start', () => {
        let messageArray = service.messages

        expect(messageArray.length).toBe(0);
    })

    it('should add a message into messages array', () => {
        service.add('Olá mundo!');

        expect(service.messages.length).toBe(1);
    })

    it('should clear the messages array', () => {
        service.add('Olá mundo!');
        service.clear();

        expect(service.messages.length).toBe(0);
    })

})