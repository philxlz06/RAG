from app.utils.parser import extract_text


def test_txt():
    text = extract_text("uploads/example.txt")
    print("TXT — First 200 chars of text:\n", text[:200])


def test_pdf():
    text = extract_text("uploads/example.pdf")
    print("PDF — First 200 chars of text:\n", text[:200])


if __name__ == "__main__":
    test_txt()
    test_pdf()
